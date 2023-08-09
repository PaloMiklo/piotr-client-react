import { createSlice } from '@reduxjs/toolkit'
import { IConfig } from '../model/config'
import { configInitial } from '../initial/config'
import { SLICE_NAMES } from '../core/slice'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IConfigStateWrapper { value: IConfig }

const initialState: IConfigStateWrapper = { value: configInitial }

export const configSlice = createSlice({
    name: SLICE_NAMES.CONFIG,
    initialState,
    reducers: {
        initialize: (state: IConfigStateWrapper, action: PayloadAction<IConfig>): void => {
            state.value = action.payload;
        },
        reset: (state: IConfigStateWrapper): void => {
            state.value = initialState.value;
        }
    },
});

const { actions, reducer } = configSlice;
export const { initialize, reset } = actions;

export default reducer;