import { configureStore } from '@reduxjs/toolkit';
import configuration from '../slice/configSlice';

export const store = configureStore({
    reducer: { config: configuration },
    middleware: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;