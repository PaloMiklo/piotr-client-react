import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cart';
import configReducer from './slice/config';
import productsReducer from './slice/products';

export const store = configureStore({
    reducer: {
        config: configReducer,
        products: productsReducer,
        cart: cartReducer
    },
    middleware: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;