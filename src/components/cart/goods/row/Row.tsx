import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, ReactElement, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Action } from 'redux';
import { StateWithHistory } from 'redux-undo';
import { handleHttpError } from '../../../../common/error';
import { useHttpGetBlob__ } from '../../../../common/hook/http-get';
import { API, ENDPOINTS } from '../../../../common/rest';
import { ActionTypes } from '../../../../store/constant/action';
import { WRAPPER_KEY } from '../../../../store/constant/slice';
import { useAppDispatch } from '../../../../store/hook/hook';
import { selectCart } from '../../../../store/selector/cart';
import { selectConfig } from '../../../../store/selector/config';
import { ICartStateWrapper } from '../../../../store/slice/cart';
import { TRecalculateCartArgs, recalculateCart } from '../../../../store/slice/thunk/cart';
import { action } from '../../../../store/util';
import { TRowProps } from './Row.config';
import './Row.scss';

const Row: FC<TRowProps> = ({ line }: TRowProps): ReactElement => {
    const { product } = line;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const config_rdx = useSelector(selectConfig);
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);
    const cart_rdx_curr = cart_rdx.present[WRAPPER_KEY];

    const isLastItem = (): boolean => (cart_rdx_curr.itemCount === 1 && cart_rdx_curr.lines.length === 1 && cart_rdx_curr.lines[0].amount === 1);

    const { response: image, error: imageError, loading: imageLoading, fetchDataBlob: fetchImage, cleanUpBlob: cleanImage } = useHttpGetBlob__({ doMock: config_rdx.doMock });

    useEffect((): () => void => {
        fetchImage(ENDPOINTS[API.PRODUCT_IMAGE](product.id));
        (!imageLoading && imageError) && handleHttpError(imageError, navigate);
        return () => !imageLoading && cleanImage();
    }, [product, imageLoading]);

    const removeViaX = (): void => {
        if (isLastItem()) {
            dispatch(action(ActionTypes.CART_RESET));
        } else {
            dispatch(action(ActionTypes.CART_REMOVE_LINE, { line }))
            dispatch(recalculateCart({ deliveryPrice: cart_rdx_curr.deliveryPrice }) as unknown as Action<TRecalculateCartArgs>);
        }
    };

    const decrement = (): void => {
        if (isLastItem()) {
            dispatch(action(ActionTypes.CART_RESET));
        } else {
            dispatch(action(ActionTypes.CART_UPDATE_LINES, { product: product, amount: -1, config: config_rdx }));
            dispatch(recalculateCart({ deliveryPrice: cart_rdx_curr.deliveryPrice }) as unknown as Action<TRecalculateCartArgs>);
        }
    };

    const increment = (): void => {
        dispatch(action(ActionTypes.CART_UPDATE_LINES, { product: product, amount: 1, config: config_rdx }));
        dispatch(recalculateCart({ deliveryPrice: cart_rdx_curr.deliveryPrice }) as unknown as Action<TRecalculateCartArgs>);
    };

    return (
        <div className="shopping-cart-products">
            <div className="col-lg-4">
                <a className="remove-item removeQuery" onClick={removeViaX}>
                    <FontAwesomeIcon icon={faXmark} />
                </a>
                <Link to={`/products/${product.id}`}>
                    <LazyLoad>
                        {config_rdx.doMock ?
                            (
                                <img className="hoverable"
                                    src={`/images/product${product.id}.jpg`}
                                    alt="Product" loading='lazy' />
                            ) : (
                                image && (
                                    <img className="hoverable"
                                        src={image}
                                        alt="Product"
                                        loading='lazy' />
                                )
                            )
                        }
                    </LazyLoad>
                </Link>
            </div>

            <div className="col-lg-8 align-items-center">
                <Link to={`/products/${product.id}`}>
                    <span className="hoverable">{product.name}</span>
                </Link>
                <div className="shopping-cart-products-quantity-value">
                    <button type="button" className="cart-decrease-button" onClick={decrement}><FontAwesomeIcon icon={faMinus} /></button>
                    <span className="cart-list-quantity-content">{line.amount}</span>
                    <button type="button" className="cart-increase-button" onClick={increment}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <Link to={`/products/${product.id}`}>
                    <span className="hoverable price removeQuery">{product.price}€</span>
                </Link>
            </div>
        </div>
    );
};

export default Row;