import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Action } from 'redux';
import { StateWithHistory } from 'redux-undo';
import { handleHttpError } from '../../../../common/error';
import { useHttpGetBlob__ } from '../../../../common/hook/http-get';
import { API, ENDPOINTS } from '../../../../common/rest';
import { ActionTypes } from '../../../../store/constant/action';
import { useAppDispatch } from '../../../../store/hook/hook';
import { selectCart } from '../../../../store/selector/cart';
import { selectConfig } from '../../../../store/selector/config';
import { ICartStateWrapper } from '../../../../store/slice/cart';
import { recalculateCart } from '../../../../store/slice/thunk/cart';
import { action } from '../../../../store/util';
import { TRowProps } from './Row.config';
import './Row.scss';

const Row = ({ line }: TRowProps): ReactElement => {
    const { product } = line;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const config_rdx = useSelector(selectConfig);
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);

    const { response: imageSrc, error: imageError, loading: loadingImage, fetchDataBlob: fetchImage, cleanUpBlob: cleanImage } = useHttpGetBlob__({ doMock: config_rdx.doMock });

    useEffect((): () => void => {
        fetchImage(ENDPOINTS[API.PRODUCT_IMAGE](product.id));
        (!loadingImage && imageError) && handleHttpError(imageError, navigate);
        return () => !loadingImage && cleanImage();
    }, [product, loadingImage]);

    const removeViaX = (): void => {
        if (cart_rdx.present.value.itemCount > 1) {
            dispatch(action(ActionTypes.CART_REMOVE_LINE, { line }))
            dispatch(recalculateCart({}) as unknown as Action);
        } else {
            dispatch(action(ActionTypes.CART_RESET));
        }
    };

    const decrement = (): void => {
        dispatch(action(ActionTypes.CART_UPDATE_LINES, { product: product, amount: -1, config: config_rdx }));
        dispatch(recalculateCart({}) as unknown as Action);
    };

    const increment = (): void => {
        dispatch(action(ActionTypes.CART_UPDATE_LINES, { product: product, amount: 1, config: config_rdx }));
        dispatch(recalculateCart({}) as unknown as Action);
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
                                imageSrc && (
                                    <img className="hoverable"
                                        src={imageSrc}
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