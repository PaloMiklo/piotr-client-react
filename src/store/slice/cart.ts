import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartLine, IConfig, IDeliveryOption } from "../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_KEY, LOCAL_STORAGE_OPERATION } from "../../storage/local-storage";
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
        updateLines: (state: ICartStateWrapper, action: PayloadAction<ICartLine & { config?: IConfig }>): void => {
            const { lines } = state.value;
            const { product, amount } = action.payload;
            const ttl = action.payload.config?.storageExpiration;

            state.value.lines = lines.some((line: ICartLine) => line.product.id === product.id) ?
                lines.map((line: ICartLine) => line.product.id === product.id ? { ...line, amount: line.amount + amount } : line) :
                [...lines, { product, amount }];
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.STORE](LOCAL_STORAGE_KEY.CART, state.value, ttl);
        },
        updateDelivery: (state: ICartStateWrapper, action: PayloadAction<IDeliveryOption & { config?: IConfig }>): void => {
            const ttl = action.payload.config?.storageExpiration;
            state.value.deliveryOption = action.payload;
            state.value.deliveryPrice = action.payload.price;
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.STORE](LOCAL_STORAGE_KEY.CART, state.value, ttl);
        },
        removeLine: (state: ICartStateWrapper, action: PayloadAction<{ line: ICartLine }>): void => {
            const { lines } = state.value;
            state.value.lines = lines.filter((line: ICartLine) => line.product.id !== action.payload.line.product.id);
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.STORE](LOCAL_STORAGE_KEY.CART, state.value);
        },
        reset: (state: ICartStateWrapper): void => {
            state.value = initialState.value;
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.CLEAR]();
        }
    },
    extraReducers: recalculateCartReducer
});

const { actions, reducer } = cartSlice;
export const { initialize, updateDelivery, reset } = actions;

export default reducer;
