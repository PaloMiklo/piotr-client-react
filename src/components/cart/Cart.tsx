import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StateWithHistory } from 'redux-undo';
import { ICart, ICartLine } from '../../model/config';
import { selectCart } from '../../store/selector/cart';
import { ICartStateWrapper } from '../../store/slice/cart';
import './Cart.scss';

const Cart = (): ReactElement => {
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);

    const [cart, setCart] = useState<ICart | null>(null);

    useEffect((): void => setCart(cart_rdx.present.value), [cart_rdx]);

    return (
        <div className="container">
            {cart && cart.lines.length > 0 ? (
                <>
                    {cart.deliveryOption && (
                        <>
                            <p>delivery option id: {cart.deliveryOption.id}</p>
                            <p>delivery option name: {cart.deliveryOption.name}</p>
                        </>
                    )}
                    <p>cart price: {cart.cartPrice}</p>
                    <p>free shipping: {cart.freeShipping ? 'yes' : 'no'}</p>
                    <p>item count: {cart.itemCount}</p>
                    {cart.lines.map((line: ICartLine) => (
                        <ul key={line.product.id}>
                            <li>
                                name: {line.product.name} amount: <span>{line.amount}</span>
                            </li>
                        </ul>
                    ))}
                </>
            ) : (
                <p>EMPTY</p>
            )}
        </div>
    );
};

export default Cart;
