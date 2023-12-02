import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartLine, IConfig, IDeliveryOption } from "../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_KEY, LOCAL_STORAGE_OPERATION } from "../../storage/local";
import { SLICE_NAMES, WRAPPER_KEY } from "../constant/slice";
import { cartInitial } from "../initial/cart";
import { recalculateCartReducer } from "./thunk/cart";

export interface ICartStateWrapper { [WRAPPER_KEY]: ICart };
const initialState: ICartStateWrapper = { [WRAPPER_KEY]: cartInitial };

export const cartSlice = createSlice({
    name: SLICE_NAMES.CART,
    initialState,
    reducers: {
        initialize: (state: ICartStateWrapper, action: PayloadAction<ICart>): void => {
            state[WRAPPER_KEY] = action.payload;
        },
        updateLines: (state: ICartStateWrapper, action: PayloadAction<ICartLine & { config?: IConfig }>): void => {
            const { lines } = state[WRAPPER_KEY];
            const { product, amount } = action.payload;
            const ttl = action.payload.config?.storageExpiration;

            state[WRAPPER_KEY].lines = lines.some((line: ICartLine) => line.product.id === product.id) ?
                lines.map((line: ICartLine) => line.product.id === product.id ? { ...line, amount: line.amount + amount } : line) :
                [...lines, { product, amount }];

            state[WRAPPER_KEY].lines = [...state[WRAPPER_KEY].lines.filter((line: ICartLine) => line.amount > 0)];

            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.STORE](LOCAL_STORAGE_KEY.CART, state[WRAPPER_KEY], ttl);
        },
        updateDelivery: (state: ICartStateWrapper, action: PayloadAction<IDeliveryOption & { config?: IConfig }>): void => {
            const ttl = action.payload.config?.storageExpiration;
            state[WRAPPER_KEY].deliveryOption = action.payload;
            state[WRAPPER_KEY].deliveryPrice = action.payload.price;
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.STORE](LOCAL_STORAGE_KEY.CART, state[WRAPPER_KEY], ttl);
        },
        removeLine: (state: ICartStateWrapper, action: PayloadAction<{ line: ICartLine }>): void => {
            const { lines } = state[WRAPPER_KEY];
            state[WRAPPER_KEY].lines = lines.filter((line: ICartLine) => line.product.id !== action.payload.line.product.id);
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.STORE](LOCAL_STORAGE_KEY.CART, state[WRAPPER_KEY]);
        },
        reset: (state: ICartStateWrapper): void => {
            state[WRAPPER_KEY] = initialState[WRAPPER_KEY];
            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.CLEAR]();
        }
    },
    extraReducers: recalculateCartReducer
});

const { actions, reducer } = cartSlice;
export const { initialize, updateDelivery, reset } = actions;

export default reducer;
