import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../model/config';
import { SLICE_NAMES, WRAPPER_KEY } from '../constant/slice';
import { productsInitial } from '../initial/products';

export interface IProductsStateWrapper { [WRAPPER_KEY]: IProduct[] };
const initialState: IProductsStateWrapper = { [WRAPPER_KEY]: productsInitial };

export const productsSlice = createSlice({
    name: SLICE_NAMES.PRODUCTS,
    initialState,
    reducers: {
        initialize: (state: IProductsStateWrapper, action: PayloadAction<IProduct[]>): void => {
            state[WRAPPER_KEY] = action.payload;
        },
        reset: (state: IProductsStateWrapper): void => {
            state[WRAPPER_KEY] = initialState[WRAPPER_KEY];
        },
        add: (state: IProductsStateWrapper, action: PayloadAction<IProduct>): void => {
            state[WRAPPER_KEY].push(action.payload);
        },
        remove: (state: IProductsStateWrapper, action: PayloadAction<number>): void => {
            state[WRAPPER_KEY] = state[WRAPPER_KEY].filter((product: IProduct) => product.id !== action.payload);
        }
    }
});

const { actions, reducer } = productsSlice;
export const { initialize, reset, add, remove } = actions;

export default reducer;