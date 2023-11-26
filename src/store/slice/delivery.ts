import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IDeliveryOption } from '../../model/config';
import { SLICE_NAMES } from '../constant/slice';
import { deliveryInitial } from '../initial/delivery';

export interface IDeliveryStateWrapper { value: IDeliveryOption[] };
const initialState: IDeliveryStateWrapper = { value: deliveryInitial };

export const deliverySlice = createSlice({
    name: SLICE_NAMES.DELIVERY,
    initialState,
    reducers: {
        initialize: (state: IDeliveryStateWrapper, action: PayloadAction<IDeliveryOption[]>): void => {
            state.value = action.payload;
        },
        reset: (state: IDeliveryStateWrapper): void => {
            state.value = initialState.value;
        },
        add: (state: IDeliveryStateWrapper, action: PayloadAction<IDeliveryOption>): void => {
            state.value.push(action.payload);
        },
        remove: (state: IDeliveryStateWrapper, action: PayloadAction<number>): void => {
            state.value = state.value.filter((delivery: IDeliveryOption) => delivery.id !== action.payload);
        }
    }
});

const { actions, reducer } = deliverySlice;
export const { initialize, reset, add, remove } = actions;

export default reducer;