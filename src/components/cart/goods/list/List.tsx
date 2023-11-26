import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action } from 'redux';
import { useHttpGetBlob } from '../../../../common/hook/http-get';
import { API, ENDPOINTS } from '../../../../common/rest';
import { ActionTypes } from '../../../../store/constant/action';
import { useAppDispatch } from '../../../../store/hook/hook';
import { selectConfig } from '../../../../store/selector/config';
import { recalculateCart } from '../../../../store/slice/thunk/cart';
import { action } from '../../../../store/util';
import { TListProps } from './List.config';
import './List.scss';

const List = ({ line }: TListProps): ReactElement => {
    const { product } = line;
    const dispatch = useAppDispatch();

    const config_rdx = useSelector(selectConfig);

    const { response: imageSrc, error: imageError, loading: imageLoading } = useHttpGetBlob(ENDPOINTS[API.PRODUCT_IMAGE](product.id), { doMock: config_rdx.doMock });

    const removeViaX = (): void => { dispatch(action(ActionTypes.CART_REMOVE_LINE, { line })); };

    const decrement = (): void => {
        line.amount === 1 ? dispatch(action(ActionTypes.CART_RESET)) : dispatch(action(ActionTypes.CART_UPDATE_LINES, { product: product, amount: -1, config: config_rdx }));
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

export default List;
