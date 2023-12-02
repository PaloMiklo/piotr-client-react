import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IDeliveryOption } from '../../model/config';
import { SLICE_NAMES, WRAPPER_KEY } from '../constant/slice';
import { deliveryInitial } from '../initial/delivery';

export interface IDeliveryStateWrapper { [WRAPPER_KEY]: IDeliveryOption[] };
const initialState: IDeliveryStateWrapper = { [WRAPPER_KEY]: deliveryInitial };

export const deliverySlice = createSlice({
    name: SLICE_NAMES.DELIVERY,
    initialState,
    reducers: {
        initialize: (state: IDeliveryStateWrapper, action: PayloadAction<IDeliveryOption[]>): void => {
            state[WRAPPER_KEY] = action.payload;
        },
        reset: (state: IDeliveryStateWrapper): void => {
            state[WRAPPER_KEY] = initialState[WRAPPER_KEY];
        },
        add: (state: IDeliveryStateWrapper, action: PayloadAction<IDeliveryOption>): void => {
            state[WRAPPER_KEY].push(action.payload);
        },
        remove: (state: IDeliveryStateWrapper, action: PayloadAction<string>): void => {
            state[WRAPPER_KEY] = state[WRAPPER_KEY].filter((delivery: IDeliveryOption) => delivery.code !== action.payload);
        }
    }
});

const { actions, reducer } = deliverySlice;
export const { initialize, reset, add, remove } = actions;

export default reducer;