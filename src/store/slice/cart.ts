import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import http from "../../common/http";
import { ICart, ICartLine, IDeliveryOption, IProduct } from "../../model/config";
import { SLICE_NAMES } from "../constant/slice";
import { cartInitial } from "../initial/cart";

export interface ICartStateWrapper { value: ICart }

const initialState: ICartStateWrapper = { value: cartInitial }

export const cartSlice = createSlice({
    name: SLICE_NAMES.CART,
    initialState,
    reducers: {
        initialize: (state: ICartStateWrapper, action: PayloadAction<ICart>): void => {
            state.value = action.payload;
        },
        updateLines: (state: ICartStateWrapper, action: PayloadAction<{ product: IProduct, amount: number, freeShipping: number, doMock: boolean }>): void => {
            const { lines } = state.value;
            const { doMock } = action.payload;
            const presentLineIndex = lines.findIndex((line: ICartLine) => line.product.id === action.payload.product.id);
            if (presentLineIndex !== -1) {
                const updatedLines = lines.map((line: ICartLine, index: number) => {
                    return index === presentLineIndex ?
                        {
                            ...line,
                            amount: line.amount + action.payload.amount
                        }
                        : line;
                });
                state.value.lines = updatedLines;
            }
            else {
                state.value.lines = [...state.value.lines, action.payload];
            }
            state.value = recalculateCart(state.value, action.payload.freeShipping, doMock);
            console.log('Current cart store state -> ', state.value)
        },
        updateDelivery: (state: ICartStateWrapper, action: PayloadAction<{ option: IDeliveryOption, freeShipping: number }>): void => {
            state.value.deliveryOption = action.payload.option;
            state.value.deliveryPrice = recalculateShipping(state.value.lines);
        },
        reset: (state: ICartStateWrapper): void => {
            state.value = initialState.value;
        }
    }
});

const cartPrice = (cartLines: ICartLine[]): number => cartLines.reduce((acc: number, curr: ICartLine) => acc + curr.product.price * curr.amount, 0);

const recalculateCart = (cartState: ICart, freeShippingFrom: number, doMock: boolean): ICart => {
    const { lines } = cartState;
    let updatedCartPrice = 0;
    if (doMock) {
        updatedCartPrice = cartPrice(lines)
    } else {
        http.post('/api/cart/recalculate', lines)
            .then((recalculationFromServer: AxiosResponse<number>) => { updatedCartPrice = recalculationFromServer.data });
    }
    return {
        ...cartState,
        ...{
            freeShipping: hasFreeShippingClaim(cartState.lines, freeShippingFrom),
            itemCount: cartState.lines.length,
            cartPrice: updatedCartPrice
        }
    }
}

const hasFreeShippingClaim = (cartLines: ICartLine[], freeShipping: number): boolean => cartPrice(cartLines) > freeShipping;
const recalculateShipping = (cartLines: ICartLine[]): number => Math.max(0, cartPrice(cartLines));

const { actions, reducer } = cartSlice;
export const { initialize, updateLines, updateDelivery, reset } = actions;

export default reducer;