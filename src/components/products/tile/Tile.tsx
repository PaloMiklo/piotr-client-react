import { ReactElement } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHttpGetBlob } from '../../../common/hook/http-get';
import { API, ENDPOINTS } from '../../../common/rest';
import { ROUTE, ROUTE_DYNAMIC } from '../../../common/route';
import { selectDoMock } from '../../../store/selector/config';
import { TProductProps } from '../product/Product.config';
import './Tile.scss';

const Tile = ({ product }: TProductProps): ReactElement => {
    const doMock_rdx = useSelector(selectDoMock);

    const { response: imageSrc, error: imageError, loading: imageLoading } = useHttpGetBlob(ENDPOINTS[API.PRODUCT_IMAGE](product.id), { doMock: doMock_rdx });

    return (
        <div className="col-sm-12 col-lg-3 product-tile">
            <LazyLoad>
                {doMock_rdx ?
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
                    <button className="btn mw-100">
                        <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                        <span> buy now</span>
                    </button>
                </div>
            </LazyLoad>
        </div>
    );
};

export default Tile;
