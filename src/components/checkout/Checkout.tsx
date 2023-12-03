import { FC, Fragment, ReactElement } from "react";
import { useSelector } from "react-redux";
import { IOrder } from "../../model/config";
import { WRAPPER_KEY } from "../../store/constant/slice";
import { selectCart } from "../../store/selector/cart";
import Order from "../order/Order";
import './Checkout.scss';

const Checkout: FC = (): ReactElement => {
    const cart_rdx = useSelector(selectCart);

    const createOrder = (data: IOrder) => {
        const order = {
            ...data,
            ...{ cart: cart_rdx.present[WRAPPER_KEY], createdUi: new Date().toISOString(), comment: 'v1' }
        }
        console.log(order);
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