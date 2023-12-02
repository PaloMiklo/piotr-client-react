import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { StateWithHistory } from "redux-undo";
import { selectCart } from "../../store/selector/cart";
import { ICartStateWrapper } from "../../store/slice/cart";

const Checkout = (): ReactElement => {
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);

    return (
        <div className="container">
            <h1>CHECKOUT PAGE</h1>
        </div>
    );
}

export default Checkout;