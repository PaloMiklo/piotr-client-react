import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StateWithHistory } from 'redux-undo';
import { ICart, ICartLine } from '../../model/config';
import { selectCart } from '../../store/selector/cart';
import { ICartStateWrapper } from '../../store/slice/cart';
import './Cart.scss';
import Row from './goods/row/Row';
import Summary from './goods/summary/Summary';

const Cart = (): ReactElement => {
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);
    const [cart, setCart] = useState<ICart | null>(null);

    useEffect((): void => setCart(cart_rdx.present.value), [cart_rdx]);

    return (
        <>
            {cart && (
                <div className="cart-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="display-4 d-flex justify-content-center">Cart</h3>
                                <span className="dash"></span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                {cart.lines.length === 0 && (
                                    <div className="shopping-cart">
                                        <div className="row mx-auto w-100">
                                            <div className="col-md-12">
                                                <div className="alert-container">
                                                    <div className="alert alert-dark col-md-12" role="alert">
                                                        <span>CART IS EMPTY <FontAwesomeIcon icon={faFaceFrown} /></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="shopping-cart-container-bought">
                                    {
                                        cart.lines.map((line: ICartLine) => <Row key={line.product.id} line={line} ></Row>)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                {cart.lines.length > 0 && (
                                    <div className="shopping-cart-container-summary fc float-md-right">
                                        {
                                            <Summary></Summary>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
