import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { handleHttpError, handleOtherError } from "../../../common/error";
import http from "../../../common/http";
import { API, ENDPOINTS } from "../../../common/rest";
import { IOrder } from "../../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_OPERATION } from "../../../storage/local";
import { ActionTypes } from "../../constant/action";
import { WRAPPER_KEY } from "../../constant/slice";
import { RootState } from "../../store";
import { action } from "../../util";
import { IOrderStateWrapper } from "../order";

export type TSendOrderArgs = { order: IOrder };
type TSendOrderPayload = { orderNumber: number };
type TSendOrderError = string;
type TSendOrderResult = TSendOrderPayload | TSendOrderError;

export const sendOrder = createAsyncThunk<TSendOrderResult | TSendOrderError, TSendOrderArgs, { rejectValue: TSendOrderError }>(
    ActionTypes.SEND_ORDER,
    async (args: TSendOrderArgs, { dispatch, getState, rejectWithValue, fulfillWithValue }): Promise<TSendOrderResult | TSendOrderError> => {

        const state = getState() as RootState;
        const config = state.config[WRAPPER_KEY];
        const { doMock } = state.config[WRAPPER_KEY];
        let orderNumber = doMock ? config.mocks.mockSendOrder : -1;
        try {
            let result = null;

            if (doMock) {
                result = { orderNumber };
            } else {
                const order$ = await http.post<number>(ENDPOINTS[API.SEND_ORDER](), args.order);
                result = { orderNumber: order$.data };
                dispatch(action(ActionTypes.CART_RESET));
            }

            return fulfillWithValue(result);
        } catch (error: unknown) {
            handleHttpError(error as AxiosError<unknown>);
            const metadata = JSON.stringify((error as AxiosError<IOrder>)?.response?.data);
            const payload = (error as AxiosError<IOrder>)?.config?.data;
            return rejectWithValue(`${metadata},\n${payload}`) as unknown as TSendOrderResult;
        }
    });

export const sendOrderReducer = (builder: ActionReducerMapBuilder<IOrderStateWrapper>) => {
    builder
        .addCase(sendOrder.pending, (_: IOrderStateWrapper, action: PayloadAction<unknown>) => { })
        .addCase(sendOrder.fulfilled, (_: IOrderStateWrapper, action: PayloadAction<TSendOrderResult>) => {
            const result = action.payload;

            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.CLEAR]();

            // TODO: Implement as an alert when alerts exist
            console.log(`Order with number ${result} was sucessfully created.`);
        })
        .addCase(sendOrder.rejected, (state: any, action: PayloadAction<unknown>) => {
            const failure = action.payload;
            handleOtherError<string>('REJECTED: ' + failure);
        });
}