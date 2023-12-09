import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { handleHttpError, handleOtherError } from "../../../common/error/error";
import http from "../../../common/http";
import { API, ENDPOINTS } from "../../../common/rest";
import { IOrder, IOrderNew } from "../../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_OPERATION } from "../../../storage/local";
import { ActionTypes } from "../../constant/action";
import { WRAPPER_KEY } from "../../constant/slice";
import { RootState } from "../../store";
import { action } from "../../util";
import { IOrderStateWrapper } from "../order";

export type TSendOrderArgs = { order: IOrderNew };
type TSendOrderPayload = { orderNumber: number };
type TSendOrderError = string | undefined;
type TSendOrderResult = TSendOrderPayload | TSendOrderError;

export const sendOrder = createAsyncThunk<TSendOrderResult | TSendOrderError, TSendOrderArgs, { rejectValue: TSendOrderError }>(
    ActionTypes.SEND_ORDER,
    async (args: TSendOrderArgs, { dispatch, getState, rejectWithValue, fulfillWithValue }): Promise<TSendOrderResult | TSendOrderError> => {

        const state = getState() as RootState;
        const config = state.config[WRAPPER_KEY];
        const { doMock } = state.config[WRAPPER_KEY];

        try {
            const result = doMock
                ? { orderNumber: config.mocks.mockSendOrder }
                : { orderNumber: (await http.post<number>(ENDPOINTS[API.SEND_ORDER](), args.order)).data };

            if (!doMock) {
                dispatch(action(ActionTypes.CART_RESET));
            }

            return fulfillWithValue(result);
        } catch (error: unknown) {
            handleHttpError(error as AxiosError<unknown>);
            const { response, config } = error as AxiosError<IOrder>;
            const metadata = JSON.stringify(response?.data);
            const payload = config?.data;

            return rejectWithValue(`${metadata},\n${payload}`) as unknown as TSendOrderResult;
        }

    });

export const sendOrderReducer = (builder: ActionReducerMapBuilder<IOrderStateWrapper>) => {
    builder
        .addCase(sendOrder.pending, (_: IOrderStateWrapper, action: PayloadAction<TSendOrderResult>) => { })
        .addCase(sendOrder.fulfilled, (_: IOrderStateWrapper, action: PayloadAction<TSendOrderResult>) => {
            const result = action.payload as TSendOrderPayload;

            LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.CLEAR]();

            // TODO: Implement as an alert
            console.log(`Order with number ${result.orderNumber} was sucessfully created.`);
        })
        .addCase(sendOrder.rejected, (state: IOrderStateWrapper, action: PayloadAction<TSendOrderResult>) => {
            const failure = action.payload;
            handleOtherError<string>('REJECTED [sendOrderReducer]: ' + failure);
        });
}
