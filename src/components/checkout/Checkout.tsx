import { BaseSyntheticEvent, ReactElement } from "react";
import { useSelector } from "react-redux";
import { StateWithHistory } from "redux-undo";
import Order from "../../form/Order";
import { IDeliveryOption, IOrder } from "../../model/config";
import { selectCart } from "../../store/selector/cart";
import { selectDeliveries } from "../../store/selector/deliveries";
import { ICartStateWrapper } from "../../store/slice/cart";

const Checkout = (): ReactElement => {
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);
    const deliveries_rdx: IDeliveryOption[] = useSelector(selectDeliveries);


    return (
        <div className="container">
            <h1>CHECKOUT PAGE</h1>
            <Order onSubmit={function (data: IOrder, event?: BaseSyntheticEvent<object, any, any> | undefined): unknown {
                console.log(data)
                throw new Error("Function not implemented.");
            }}></Order>
        </div>
    );
}

export default Checkout;