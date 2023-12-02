import { ICart } from "../../model/config";

export const cartInitial: ICart = {
    lines: [],
    deliveryOption: null,
    deliveryPrice: 5.99,
    freeShipping: false,
    itemCount: 0,
    cartPrice: 0,
    cartPriceTotal: 0
}