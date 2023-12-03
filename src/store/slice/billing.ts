import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IBillingOption } from '../../model/config';
import { SLICE_NAMES, WRAPPER_KEY } from '../constant/slice';
import { billingInitial } from '../initial/billingInitial';

export interface IBillingStateWrapper { [WRAPPER_KEY]: IBillingOption[] };
const initialState: IBillingStateWrapper = { [WRAPPER_KEY]: billingInitial };

export const billingSlice = createSlice({
    name: SLICE_NAMES.BILLING,
    initialState,
    reducers: {
        initialize: (state: IBillingStateWrapper, action: PayloadAction<IBillingOption[]>): void => {
            state[WRAPPER_KEY] = action.payload;
        },
        reset: (state: IBillingStateWrapper): void => {
            state[WRAPPER_KEY] = initialState[WRAPPER_KEY];
        },
        add: (state: IBillingStateWrapper, action: PayloadAction<IBillingOption>): void => {
            state[WRAPPER_KEY].push(action.payload);
        },
        remove: (state: IBillingStateWrapper, action: PayloadAction<string>): void => {
            state[WRAPPER_KEY] = state[WRAPPER_KEY].filter((billing: IBillingOption) => billing.code !== action.payload);
        }
    }
});

const { actions, reducer } = billingSlice;
export const { initialize, reset, add, remove } = actions;

export default reducer;