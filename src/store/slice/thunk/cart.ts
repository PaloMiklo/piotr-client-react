import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { handleHttpError } from "../../../common/error";
import http from "../../../common/http";
import { API, ENDPOINTS } from "../../../common/rest";
import { ICartRecalculateDto, ICartRecalculateResultDto, IConfig } from "../../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_KEY, LOCAL_STORAGE_OPERATION } from "../../../storage/local";
import { ActionTypes } from "../../constant/action";
import { WRAPPER_KEY } from "../../constant/slice";
import { RootState, store, UNDOABLE } from "../../store";
import { action } from "../../util";
import { ICartStateWrapper } from "../cart";
import { hasFreeShippingClaim, recalculateCartPrice } from "../util/cart";

export type TRecalculateCartArgs = { deliveryPrice: number };
type TRecalculateCartPayload = { calculatedCartPrice: number; calculatedCartPriceTotal: number, freeShipping: number, doMock: boolean, config?: IConfig };
type TRecalculateError = AxiosError<unknown>;
type TRecalculateCartResult = TRecalculateCartPayload | TRecalculateError;

export const recalculateCart = createAsyncThunk<TRecalculateCartResult | TRecalculateError, TRecalculateCartArgs, { rejectValue: TRecalculateError }>(
    ActionTypes.CART_RECALCULATE,
    async (args: TRecalculateCartArgs, { getState, rejectWithValue }): Promise<TRecalculateCartResult | TRecalculateError> => {
        let calculatedCartPrice = 0;
        let calculatedCartPriceTotal = 0;
        const state = getState() as RootState;
        const config = state.config[WRAPPER_KEY];
        const deliveryPrice = args.deliveryPrice;
        const { lines } = state.cart.present[WRAPPER_KEY];
        const { freeShipping } = state.config[WRAPPER_KEY];
        const { doMock } = config;

        if (config.doMock) {
            calculatedCartPrice = recalculateCartPrice(lines);
            calculatedCartPriceTotal = calculatedCartPrice + deliveryPrice;
        } else {
            try {
                const recalculation$ = await http.post<ICartRecalculateResultDto>(ENDPOINTS[API.CART_RECALCULATION](), { cartLines: lines, deliveryPrice: deliveryPrice } as ICartRecalculateDto);
                calculatedCartPrice = recalculation$.data.cartPrice;
                calculatedCartPriceTotal = recalculation$.data.cartPriceTotal;
            } catch (error: unknown) {
                handleHttpError(error as AxiosError<unknown>);
                store.dispatch(action(UNDOABLE.cart.undo));
                return rejectWithValue(JSON.stringify(error) as unknown as TRecalculateError) as unknown as TRecalculateError;
            }
        }

        return { calculatedCartPrice, calculatedCartPriceTotal, freeShipping, doMock, config };
    }
);

export const recalculateCartReducer = (builder: ActionReducerMapBuilder<ICartStateWrapper>) => {
    builder
        .addCase(recalculateCart.pending, (state: ICartStateWrapper, action: PayloadAction<unknown>) => { })
        .addCase(recalculateCart.fulfilled, (state: ICartStateWrapper, action: PayloadAction<TRecalculateCartResult>) => {
            const result = action.payload as TRecalculateCartPayload;
            const { lines } = state[WRAPPER_KEY];

            const { config } = result;
            const ttl = config?.storageExpiration;

            state[WRAPPER_KEY] = {
                ...state[WRAPPER_KEY],
                freeShipping: result.doMock ? hasFreeShippingClaim(lines, result.freeShipping) : result.calculatedCartPrice > result.freeShipping,
                itemCount: lines.length,
                cartPrice: result.calculatedCartPrice,
                cartPriceTotal: result.calculatedCartPriceTotal,
            };
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.STORE](LOCAL_STORAGE_KEY.CART, state[WRAPPER_KEY], ttl);
        })
        .addCase(recalculateCart.rejected, (state: ICartStateWrapper, action: PayloadAction<unknown>) => {
            console.log('REJECTED: ', JSON.stringify(state[WRAPPER_KEY]));
        });
}