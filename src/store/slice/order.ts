import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../model/config";
import { SLICE_NAMES, WRAPPER_KEY } from "../constant/slice";
import { orderInitial } from "../initial/order";
import { sendOrderReducer } from "./thunk/order";

export interface IOrderStateWrapper { [WRAPPER_KEY]: IOrder };
const initialState: IOrderStateWrapper = { [WRAPPER_KEY]: orderInitial };

export const orderSlice = createSlice({
    name: SLICE_NAMES.ORDER,
    initialState,
    reducers: {},
    extraReducers: sendOrderReducer
});

const { actions, reducer } = orderSlice;
export const { } = actions;

export default reducer;
