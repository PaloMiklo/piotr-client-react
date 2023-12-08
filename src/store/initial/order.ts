import { IOrder } from "../../model/config";

export const orderInitial: IOrder = {
    customer: {
        firstName: '',
        lastName: '',
        message: '',
        email: '',
        shippingAddress: {
            street: '',
            houseNumber: '',
            zipCode: '',
            city: '',
            country: '',
        },
        billingAddress: {
            street: '',
            houseNumber: '',
            zipCode: '',
            city: '',
            country: '',
        },
    },
    deliveryOptionItemCode: '',
    billingOptionItemCode: '',
    cart: {
        lines: [{
            product: {
                id: 0,
                name: '',
                quantity: 0,
                price: 0,
                description: '',
                valid: false
            },
            amount: 0
        }],
        deliveryOption: {
            code: '',
            name: '',
            price: 0,
        },
        deliveryPrice: 0,
        freeShipping: false,
        itemCount: 0,
        cartPrice: 0,
        cartPriceTotal: 0,
    },
    createdUi: '',
    comment: '',
    id: 0
};