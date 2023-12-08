import { FC, Fragment, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Action } from "redux";
import { ICartLine, IOrder, IOrderNew } from "../../model/config";
import { WRAPPER_KEY } from "../../store/constant/slice";
import { useAppDispatch } from "../../store/hook/hook";
import { selectCart } from "../../store/selector/cart";
import { sendOrder } from "../../store/slice/thunk/order";
import Order from "../order/Order";
import './Checkout.scss';

const Checkout: FC = (): ReactElement => {
    const cart_rdx = useSelector(selectCart);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const createOrder = (data: IOrder) => {
        const cart = cart_rdx.present[WRAPPER_KEY];

        const order: IOrderNew = {
            customer: {
                firstName: data.customer.firstName,
                lastName: data.customer.lastName,
                email: data.customer.email
            },
            deliveryOptionItemCode: data.deliveryOptionItemCode,
            billingOptionItemCode: data.billingOptionItemCode,
            createdUi: new Date().toISOString(),
            note: data.note,
            shippingAddress: {
                street: data.customer.shippingAddress.street,
                houseNumber: data.customer.shippingAddress.houseNumber,
                zipCode: data.customer.shippingAddress.zipCode,
                city: data.customer.shippingAddress.city,
                country: data.customer.shippingAddress.country
            },
            billingAddress: {
                street: data.customer.billingAddress.street,
                houseNumber: data.customer.billingAddress.houseNumber,
                zipCode: data.customer.billingAddress.zipCode,
                city: data.customer.billingAddress.city,
                country: data.customer.billingAddress.country
            },
            cart: {
                freeShipping: cart.freeShipping,
                itemCount: cart.itemCount,
                cartPrice: cart.cartPrice,
                lines: cart.lines.map((line: ICartLine) => ({
                    productId: line.product.id,
                    productPrice: line.product.price,
                    amount: line.amount
                }))
            }
        }
        console.log(order);

        dispatch(sendOrder({ order: order }) as unknown as Action<IOrderNew>);
        // navigate(ROUTE.ROOT);
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="display-4 d-flex justify-content-center">checkout</h3>
                        <span className="dash"></span>
                    </div>
                </div>
                <Order onSubmit={createOrder}></Order>
            </div>
        </Fragment>
    );
}

export default Checkout;