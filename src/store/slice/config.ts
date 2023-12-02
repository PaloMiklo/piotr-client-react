import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IConfig } from '../../model/config'
import { SLICE_NAMES, WRAPPER_KEY } from '../constant/slice'
import { configInitial } from '../initial/config'

export interface IConfigStateWrapper { [WRAPPER_KEY]: IConfig };
const initialState: IConfigStateWrapper = { [WRAPPER_KEY]: configInitial };

export const configSlice = createSlice({
    name: SLICE_NAMES.CONFIG,
    initialState,
    reducers: {
        initialize: (state: IConfigStateWrapper, action: PayloadAction<IConfig>): void => {
            state[WRAPPER_KEY] = action.payload;
        },
        reset: (state: IConfigStateWrapper): void => {
            state[WRAPPER_KEY] = initialState[WRAPPER_KEY];
        }
    },
});

const { actions, reducer } = configSlice;
export const { initialize, reset } = actions;

export default reducer;