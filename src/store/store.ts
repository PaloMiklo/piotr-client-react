import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slice/configSlice';
import productsReducer from './slice/productsSlice';

export const store = configureStore({
    reducer: {
        config: configReducer,
        products: productsReducer
    },
    middleware: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;