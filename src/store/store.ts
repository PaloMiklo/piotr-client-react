import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import undoable from 'redux-undo';
import cartReducer, { ICartStateWrapper } from './slice/cart';
import configReducer from './slice/config';
import deliveryReducer from './slice/delivery';
import productsReducer from './slice/products';

export const UNDOABLE = { cart: { undo: 'CART_UNDO', redo: 'CART_REDO' } }

const undoableCartReducer = undoable(cartReducer, {
    limit: 3,
    undoType: UNDOABLE.cart.undo,
    redoType: UNDOABLE.cart.redo
});

const rootReducer = combineReducers({
    config: configReducer,
    delivery: deliveryReducer,
    products: productsReducer,
    cart: undoableCartReducer,
});

export const store: EnhancedStore = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunkMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = {
    config: ReturnType<typeof configReducer>;
    delivery: ReturnType<typeof deliveryReducer>;
    products: ReturnType<typeof productsReducer>;
    cart: {
        past: ICartStateWrapper[];
        present: ICartStateWrapper;
        future: ICartStateWrapper[];
    };
};
