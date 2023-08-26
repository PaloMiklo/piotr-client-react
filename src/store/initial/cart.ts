import { ICart } from "../../model/config";

export const cartInitial: ICart = {
    lines: [],
    deliveryOption: null,
    deliveryPrice: 0,
    freeShipping: false,
    itemCount: 0,
    cartPrice: 0
}