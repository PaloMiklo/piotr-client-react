import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { handleHttpError } from "../../../common/error";
import http from "../../../common/http";
import { API, ENDPOINTS } from "../../../common/rest";
import { IOrder } from "../../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_OPERATION } from "../../../storage/local";
import { ActionTypes } from "../../constant/action";
import { WRAPPER_KEY } from "../../constant/slice";
import { RootState } from "../../store";
import { IOrderStateWrapper } from "../order";

export type TSendOrderArgs = { order: IOrder };
type TSendOrderPayload = { orderNumber: number };
type TSendOrderError = AxiosError<unknown>;
type TSendOrderResult = TSendOrderPayload | TSendOrderError;

export const sendOrder = createAsyncThunk<TSendOrderResult | TSendOrderError, TSendOrderArgs, { rejectValue: TSendOrderError }>(
    ActionTypes.SEND_ORDER,
    async (args: TSendOrderArgs, { getState, rejectWithValue }): Promise<TSendOrderResult | TSendOrderError> => {

        const state = getState() as RootState;
        const config = state.config[WRAPPER_KEY];
        const { doMock } = config;
        let orderNumber: number = -1;

        if (config.doMock) {
            return { orderNumber: 123456789 };
        } else {
            try {
                const order$ = await http.post<number>(ENDPOINTS[API.SEND_ORDER](), args.order);
                orderNumber = order$.data;
            } catch (error: unknown) {
                handleHttpError(error as AxiosError<unknown>);
                return rejectWithValue(JSON.stringify(error) as unknown as TSendOrderError) as unknown as TSendOrderError;
            }
        }

        return { orderNumber };
    }
);

export const sendOrderReducer = (builder: ActionReducerMapBuilder<IOrderStateWrapper>) => {
    builder
        .addCase(sendOrder.pending, (state: IOrderStateWrapper, action: PayloadAction<unknown>) => { })
        .addCase(sendOrder.fulfilled, (state: IOrderStateWrapper, action: PayloadAction<TSendOrderResult>) => {
            const result = action.payload as TSendOrderPayload;

            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.CLEAR]();

            // TODO: Implement as an alert when alerts exist
            console.log(`Order with number ${result.orderNumber} was sucessfully created.`)
        })
        .addCase(sendOrder.rejected, (state: IOrderStateWrapper, action: PayloadAction<unknown>) => {
            console.log('REJECTED: ', JSON.stringify(state[WRAPPER_KEY]));
        });
}