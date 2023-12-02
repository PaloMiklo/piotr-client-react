import React, { ReactElement } from "react";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import { StateWithHistory } from "redux-undo";
import { ICartLine } from "../../model/config";
import { selectCart } from "../../store/selector/cart";
import { ICartStateWrapper } from "../../store/slice/cart";
import Row from "../cart/goods/row/Row";

const Checkout = (): ReactElement => {
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);
    const cartLines: ICartLine[] = cart_rdx?.present.value.lines;

    return (
        <div className="container">
            {
                cartLines && cartLines?.map((cartLine: ICartLine, index: number) => (
                    <LazyLoad key={index} once>
                        <React.Fragment>
                            <Row line={cartLine} />
                        </React.Fragment>
                    </LazyLoad>
                ))
            }
        </div>
    );
}

export default Checkout;