import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { handleHttpError } from "../../common/error";
import http from "../../common/http";
import { ICart, ICartLine, IDeliveryOption, IProduct } from "../../model/config";
import { ActionTypes } from "../constant/action";
import { SLICE_NAMES } from "../constant/slice";
import { cartInitial } from "../initial/cart";
import { RootState, store, UNDOABLE } from "../store";
import { action } from "../util";

export interface ICartStateWrapper { value: ICart }
const initialState: ICartStateWrapper = { value: cartInitial }

export const cartSlice = createSlice({
    name: SLICE_NAMES.CART,
    initialState,
    reducers: {
        initialize: (state: ICartStateWrapper, action: PayloadAction<ICart>): void => {
            state.value = action.payload;
        },
        updateLines: (state: ICartStateWrapper, action: PayloadAction<{ product: IProduct, amount: number, freeShipping: number }>): void => {
            const { lines } = state.value;
            const presentLineIndex = lines.findIndex((line: ICartLine) => line.product.id === action.payload.product.id);
            if (presentLineIndex === -1) {
                state.value.lines = [...lines, action.payload];
            }
            else {
                const updatedLines = lines.map((line: ICartLine, index: number) => {
                    return index === presentLineIndex ?
                        {
                            ...line,
                            amount: line.amount + action.payload.amount
                        }
                        : line;
                });
                state.value.lines = updatedLines;
            }
        },
        updateDelivery: (state: ICartStateWrapper, action: PayloadAction<IDeliveryOption>): void => {
            state.value.deliveryOption = action.payload;
            state.value.deliveryPrice = action.payload.price;
        },
        reset: (state: ICartStateWrapper): void => {
            state.value = initialState.value;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<ICartStateWrapper>) => {
        builder
            .addCase(recalculateCart.pending, (state: ICartStateWrapper, action: PayloadAction<unknown>) => { })
            .addCase(recalculateCart.fulfilled, (state: ICartStateWrapper, action: PayloadAction<TRecalculateCartResult>) => {
                const result = action.payload as TRecalculateCartPayload;
                state.value = {
                    ...state.value,
                    freeShipping: hasFreeShippingClaim(state.value.lines, result.freeShippingFrom),
                    itemCount: state.value.lines.length,
                    cartPrice: result.calculatedCartPrice,
                };
                console.log('CURRENT STATE OF CART -> ', state.value)
            })
            .addCase(recalculateCart.rejected, (state: ICartStateWrapper, action: PayloadAction<unknown>) => {
                console.log('REJECTED: ', JSON.stringify(state.value));
            });
    }
});

type TRecalculateCartArgs = {};
type TRecalculateCartPayload = { calculatedCartPrice: number; freeShippingFrom: number };
type TRecalculateError = AxiosError<unknown>;
type TRecalculateCartResult = TRecalculateCartPayload | TRecalculateError;

export const recalculateCart = createAsyncThunk<TRecalculateCartResult | TRecalculateError, TRecalculateCartArgs, { rejectValue: TRecalculateError }>(
    ActionTypes.CART_RECALCULATE,
    async (_, { getState, rejectWithValue }): Promise<TRecalculateCartResult | TRecalculateError> => {
        let calculatedCartPrice = 0;
        const state = getState() as RootState;
        const { lines } = state.cart.present.value;
        const { freeShipping: freeShippingFrom } = state.config.value;
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

        return { calculatedCartPrice, freeShippingFrom };
    }
);

const recalculateCartPrice = (cartLines: ICartLine[]): number => cartLines.reduce((acc: number, curr: ICartLine) => acc + curr.product.price * curr.amount, 0);
const hasFreeShippingClaim = (cartLines: ICartLine[], freeShipping: number): boolean => recalculateCartPrice(cartLines) > freeShipping;

const { actions, reducer } = cartSlice;
export const { initialize, updateDelivery, reset } = actions;

export default reducer;