import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { handleHttpError } from "../../../common/error";
import http from "../../../common/http";
import { ActionTypes } from "../../constant/action";
import { RootState, store, UNDOABLE } from "../../store";
import { action } from "../../util";
import { ICartStateWrapper } from "../cart";
import { hasFreeShippingClaim, recalculateCartPrice } from "../util/cart";

type TRecalculateCartArgs = {};
type TRecalculateCartPayload = { calculatedCartPrice: number; freeShipping: number };
type TRecalculateError = AxiosError<unknown>;
type TRecalculateCartResult = TRecalculateCartPayload | TRecalculateError;

export const recalculateCart = createAsyncThunk<TRecalculateCartResult | TRecalculateError, TRecalculateCartArgs, { rejectValue: TRecalculateError }>(
    ActionTypes.CART_RECALCULATE,
    async (_, { getState, rejectWithValue }): Promise<TRecalculateCartResult | TRecalculateError> => {
        let calculatedCartPrice = 0;
        const state = getState() as RootState;
        const { lines } = state.cart.present.value;
        const { freeShipping } = state.config.value;
        const { doMock } = state.config.value;

        if (doMock) {
            calculatedCartPrice = recalculateCartPrice(lines);
        } else {
            try {
                const recalculationFromServer = await http.post('/api/cart/recalculate', lines);
                calculatedCartPrice = recalculationFromServer.data;
            } catch (error: unknown) {
                handleHttpError(error as AxiosError<unknown>);
                store.dispatch(action(UNDOABLE.cart.undo));
                return rejectWithValue(JSON.stringify(error) as unknown as TRecalculateError) as unknown as TRecalculateError;
            }
        }

        return { calculatedCartPrice, freeShipping };
    }
);

export const recalculateCartReducer = (builder: ActionReducerMapBuilder<ICartStateWrapper>) => {
    builder
        .addCase(recalculateCart.pending, (state: ICartStateWrapper, action: PayloadAction<unknown>) => { })
        .addCase(recalculateCart.fulfilled, (state: ICartStateWrapper, action: PayloadAction<TRecalculateCartResult>) => {
            const result = action.payload as TRecalculateCartPayload;
            const { lines } = state.value;
            state.value = {
                ...state.value,
                freeShipping: hasFreeShippingClaim(lines, result.freeShipping),
                itemCount: lines.length,
                cartPrice: result.calculatedCartPrice,
            };
            console.log('CURRENT STATE OF CART -> ', state.value)
        })
        .addCase(recalculateCart.rejected, (state: ICartStateWrapper, action: PayloadAction<unknown>) => {
            console.log('REJECTED: ', JSON.stringify(state.value));
        });
}