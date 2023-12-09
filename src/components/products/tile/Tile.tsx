import { FC, ReactElement } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Action } from 'redux';
import { StateWithHistory } from 'redux-undo';
import { handleHttpError } from '../../../common/error/error';
import { useHttpGetBlob } from '../../../common/hook/http-get';
import { API, ENDPOINTS } from '../../../common/rest';
import { ROUTE, ROUTE_DYNAMIC } from '../../../common/route';
import { ICartLine } from '../../../model/config';
import { ActionTypes } from '../../../store/constant/action';
import { WRAPPER_KEY } from '../../../store/constant/slice';
import { useAppDispatch } from '../../../store/hook/hook';
import { selectCart } from '../../../store/selector/cart';
import { selectConfig } from '../../../store/selector/config';
import { ICartStateWrapper } from '../../../store/slice/cart';
import { TRecalculateCartArgs, recalculateCart } from '../../../store/slice/thunk/cart';
import { action } from '../../../store/util';
import { TTileProps } from './Tile.config';
import './Tile.scss';

const Tile: FC<TTileProps> = ({ product }: TTileProps): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const config_rdx = useSelector(selectConfig);
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);

    const { response: image, error: imageError, loading: imageLoading } = useHttpGetBlob(ENDPOINTS[API.PRODUCT_IMAGE](product.id), { doMock: config_rdx.doMock });
    (!imageLoading && imageError) && handleHttpError(imageError, navigate);

    const addProductToCart = (): void => {
        product && dispatch(action(ActionTypes.CART_UPDATE_LINES, { product: product, amount: 1, config: config_rdx } as ICartLine));
        dispatch(recalculateCart({ deliveryPrice: cart_rdx.present[WRAPPER_KEY].deliveryPrice }) as unknown as Action<TRecalculateCartArgs>);
        navigate(`../${ROUTE.CART}`);
    };

    return (
        <div className="col-sm-12 col-lg-3 product-tile">
            <LazyLoad once>
                {config_rdx.doMock ?
                    (
                        <img
                            className="img-fluid mx-auto"
                            src={`/images/product${product.id}.jpg`}
                            alt="Image of a product"
                            loading="lazy"
                        />
                    ) : (
                        image && (
                            <img
                                className="img-fluid mx-auto"
                                src={image}
                                alt="Image of a product"
                                loading="lazy"
                            />
                        )
                    )
                }
                <Link to={ROUTE_DYNAMIC[ROUTE.PRODUCT_DETAIL](product.id)}>
                    <div className="overlay">
                        <div className="info">
                            <span className="product-info-name">{product.name}</span>
                            <span className="dash"></span>
                            <p className="product-info-price">
                                <span className="price">{product.price} EUR</span>
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="buttons">
                    <button className="btn mw-100" onClick={addProductToCart}>
                        <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                        <span> buy now</span>
                    </button>
                </div>
            </LazyLoad>
        </div>
    );
};

export default Tile;