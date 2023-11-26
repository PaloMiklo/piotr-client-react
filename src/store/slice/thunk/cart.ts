import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { handleHttpError } from "../../../common/error";
import http from "../../../common/http";
import { API_PREFIX } from "../../../common/rest";
import { IConfig, TCartRecalculateDto } from "../../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_KEY, LOCAL_STORAGE_OPERATION } from "../../../storage/local-storage";
import { ActionTypes } from "../../constant/action";
import { RootState, store, UNDOABLE } from "../../store";
import { action } from "../../util";
import { ICartStateWrapper } from "../cart";
import { hasFreeShippingClaim, recalculateCartPrice } from "../util/cart";

type TRecalculateCartArgs = { config?: IConfig };
type TRecalculateCartPayload = { calculatedCartPrice: number; freeShipping: number, doMock: boolean, config?: IConfig };
type TRecalculateError = AxiosError<unknown>;
type TRecalculateCartResult = TRecalculateCartPayload | TRecalculateError;

export const recalculateCart = createAsyncThunk<TRecalculateCartResult | TRecalculateError, TRecalculateCartArgs, { rejectValue: TRecalculateError }>(
    ActionTypes.CART_RECALCULATE,
    async (args, { getState, rejectWithValue }): Promise<TRecalculateCartResult | TRecalculateError> => {
        let calculatedCartPrice = 0;
        const state = getState() as RootState;
        const { lines } = state.cart.present.value;
        const { freeShipping } = state.config.value;
        const { doMock } = state.config.value;
        const { config } = args;

        if (doMock) {
            calculatedCartPrice = recalculateCartPrice(lines);
        } else {
            try {
                const recalculationFromApi = await http.post(`${API_PREFIX}/cart/recalculate`, lines as TCartRecalculateDto[]);
                calculatedCartPrice = recalculationFromApi.data;
            } catch (error: unknown) {
                handleHttpError(error as AxiosError<unknown>);
                store.dispatch(action(UNDOABLE.cart.undo));
                return rejectWithValue(JSON.stringify(error) as unknown as TRecalculateError) as unknown as TRecalculateError;
            }
        }

        return { calculatedCartPrice, freeShipping, doMock, config };
    }
);

export const recalculateCartReducer = (builder: ActionReducerMapBuilder<ICartStateWrapper>) => {
    builder
        .addCase(recalculateCart.pending, (state: ICartStateWrapper, action: PayloadAction<unknown>) => { })
        .addCase(recalculateCart.fulfilled, (state: ICartStateWrapper, action: PayloadAction<TRecalculateCartResult>) => {
            const result = action.payload as TRecalculateCartPayload;
            const { lines } = state.value;

            const { config } = result;
            const ttl = config?.storageExpiration;

            state.value = {
                ...state.value,
                freeShipping: result.doMock ? hasFreeShippingClaim(lines, result.freeShipping) : result.calculatedCartPrice > result.freeShipping,
                itemCount: lines.length,
                cartPrice: result.calculatedCartPrice,
            };
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.STORE](LOCAL_STORAGE_KEY.CART, state.value, ttl);
            console.log('CURRENT STATE OF CART -> ', state.value)
        })
        .addCase(recalculateCart.rejected, (state: ICartStateWrapper, action: PayloadAction<unknown>) => {
            console.log('REJECTED: ', JSON.stringify(state.value));
        });
}