import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../model/config';
import { SLICE_NAMES } from '../constant/slice';
import { productsInitial } from '../initial/products';

export interface IProductsStateWrapper { value: IProduct[] };
const initialState: IProductsStateWrapper = { value: productsInitial };

export const productsSlice = createSlice({
    name: SLICE_NAMES.PRODUCTS,
    initialState,
    reducers: {
        initialize: (state: IProductsStateWrapper, action: PayloadAction<IProduct[]>): void => {
            state.value = action.payload;
        },
        reset: (state: IProductsStateWrapper): void => {
            state.value = initialState.value;
        },
        add: (state: IProductsStateWrapper, action: PayloadAction<IProduct>): void => {
            state.value.push(action.payload);
        },
        remove: (state: IProductsStateWrapper, action: PayloadAction<number>): void => {
            state.value = state.value.filter((product: IProduct) => product.id !== action.payload);
        }
    }
});

const { actions, reducer } = productsSlice;
export const { initialize, reset, add, remove } = actions;

export default reducer;