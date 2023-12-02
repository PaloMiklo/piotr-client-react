import { ReactElement } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Action } from 'redux';
import { handleHttpError } from '../../../common/error';
import { useHttpGetBlob } from '../../../common/hook/http-get';
import { API, ENDPOINTS } from '../../../common/rest';
import { ROUTE, ROUTE_DYNAMIC } from '../../../common/route';
import { ICartLine } from '../../../model/config';
import { ActionTypes } from '../../../store/constant/action';
import { useAppDispatch } from '../../../store/hook/hook';
import { selectConfig } from '../../../store/selector/config';
import { recalculateCart } from '../../../store/slice/thunk/cart';
import { action } from '../../../store/util';
import { TProductProps } from '../product/Product.config';
import './Tile.scss';

const Tile = ({ product }: TProductProps): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const config_rdx = useSelector(selectConfig);

    const { response: imageSrc, error: imageError, loading: loadingImage } = useHttpGetBlob(ENDPOINTS[API.PRODUCT_IMAGE](product.id), { doMock: config_rdx.doMock });
    (!loadingImage && imageError) && handleHttpError(imageError, navigate);

    const addProductToCart = (): void => {
        product && dispatch(action(ActionTypes.CART_UPDATE_LINES, { product: product, amount: 1, config: config_rdx } as ICartLine));
        dispatch(recalculateCart({}) as unknown as Action);
        navigate(`../${ROUTE.CHECKOUT}`);
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
                        imageSrc && (
                            <img
                                className="img-fluid mx-auto"
                                src={imageSrc}
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