import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartLine, IDeliveryOption } from "../../model/config";
import { SLICE_NAMES } from "../constant/slice";
import { cartInitial } from "../initial/cart";
import { recalculateCartReducer } from "./thunk/cart";

export interface ICartStateWrapper { value: ICart };
const initialState: ICartStateWrapper = { value: cartInitial };

export const cartSlice = createSlice({
    name: SLICE_NAMES.CART,
    initialState,
    reducers: {
        initialize: (state: ICartStateWrapper, action: PayloadAction<ICart>): void => {
            state.value = action.payload;
        },
        updateLines: (state: ICartStateWrapper, action: PayloadAction<ICartLine>): void => {
            const { lines } = state.value;
            const { product, amount } = action.payload;

            state.value.lines = lines.some((line: ICartLine) => line.product.id === product.id) ?
                lines.map((line: ICartLine) => line.product.id === product.id ? { ...line, amount: line.amount + amount } : line) :
                [...lines, { product, amount }];
        },
        updateDelivery: (state: ICartStateWrapper, action: PayloadAction<IDeliveryOption>): void => {
            state.value.deliveryOption = action.payload;
            state.value.deliveryPrice = action.payload.price;
        },
        removeLine: (state: ICartStateWrapper, action: PayloadAction<{ line: ICartLine }>): void => {
            const { lines } = state.value;
            state.value.lines = lines.filter((line: ICartLine) => line.product.id !== action.payload.line.product.id);
        },
        reset: (state: ICartStateWrapper): void => {
            state.value = initialState.value;
        }
    },
    extraReducers: recalculateCartReducer
});

const { actions, reducer } = cartSlice;
export const { initialize, updateDelivery, reset } = actions;

export default reducer;