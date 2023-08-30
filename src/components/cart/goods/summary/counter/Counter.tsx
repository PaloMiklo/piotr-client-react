import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateWithHistory } from "redux-undo";
import { CURRENCY } from "../../../../../core/constant";
import { ICart, IConfig } from "../../../../../model/config";
import { selectCart } from "../../../../../store/selector/cart";
import { selectConfig } from "../../../../../store/selector/config";
import { ICartStateWrapper } from "../../../../../store/slice/cart";

const Counter = (): ReactElement => {
    const config_rdx: IConfig = useSelector(selectConfig);
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);

    const [cart, setCart] = useState<ICart | null>(null);

    useEffect((): void => setCart(cart_rdx.present.value), [cart_rdx]);

    return (
        <>
            {cart && config_rdx && (
                <div className="counter-container">
                    <li className="shopping-cart-summary-wrapper-list">
                        Items ({cart.itemCount})
                        <span className="shopping-cart-summary-price">
                            <span className="price">{cart.cartPrice - cart.deliveryPrice} {CURRENCY.EURO}</span>
                        </span>
                    </li>

                    <li className="shopping-cart-summary-wrapper-list">
                        Shipping
                        <div className="shopping-cart-summary-price-shipping">
                            <span className="currency">{cart.freeShipping ? 0 : cart.deliveryPrice} {CURRENCY.EURO}</span>
                        </div>
                    </li>

                    <li className="shopping-cart-summary-wrapper-list">
                        <b>Total</b>
                        <div className="shopping-cart-summary-price-total">
                            <span className="currency">
                                <b>{cart.cartPrice} {CURRENCY.EURO}</b>
                            </span>
                        </div>
                    </li>

                    <div className="sum-more-than">
                        {cart.cartPrice > config_rdx.freeShipping && (
                            <span>Shipping free!</span>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Counter;
