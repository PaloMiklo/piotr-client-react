import { ICart } from "../../model/config";

export const cartInitial: ICart = {
    lines: [],
    deliveryOption: {
        "id": 2,
        "name": "GLS",
        "description": "Standard shipping can take up to 4 days",
        "price": 5.99
    },
    deliveryPrice: 5.99,
    freeShipping: false,
    itemCount: 0,
    cartPrice: 0
}