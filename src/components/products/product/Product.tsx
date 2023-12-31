import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Action } from 'redux';
import { StateWithHistory } from 'redux-undo';
import { handleHttpError, handleOtherError } from '../../../common/error/error';
import { useHttpGetBlob__ } from '../../../common/hook/http-get';
import { API, ENDPOINTS } from '../../../common/rest';
import { ROUTE } from '../../../common/route';
import { CURRENCY } from '../../../core/constant';
import { copyToClipboard } from '../../../core/util';
import { ICartLine, IProduct } from '../../../model/config';
import { ActionTypes } from '../../../store/constant/action';
import { WRAPPER_KEY } from '../../../store/constant/slice';
import { useAppDispatch } from '../../../store/hook/hook';
import { selectCart } from '../../../store/selector/cart';
import { selectConfig } from '../../../store/selector/config';
import { selectProducts } from '../../../store/selector/products';
import { ICartStateWrapper } from '../../../store/slice/cart';
import { TRecalculateCartArgs, recalculateCart } from '../../../store/slice/thunk/cart';
import { action } from '../../../store/util';
import ProductModal from './Product-Modal';
import './Product.scss';

const Product: FC = (): ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const config_rdx = useSelector(selectConfig);
    const products_rdx = useSelector(selectProducts);
    const cart_rdx: StateWithHistory<ICartStateWrapper> = useSelector(selectCart);

    const [products, setProducts] = useState<IProduct[]>();
    const [activatedProduct, setActivatedProduct] = useState<IProduct | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);

    const { response: image, error: imageError, loading: imageLoading, fetchDataBlob: fetchImage, cleanUpBlob: cleanImage } = useHttpGetBlob__({ doMock: config_rdx.doMock });

    useEffect((): void => { setProducts(products_rdx); }, [products_rdx]);

    useEffect((): void => {
        if (products?.length) {
            const foundProduct = id ? products.find((product: IProduct) => product.id === +id) : null;
            foundProduct ? setActivatedProduct(foundProduct) : handleOtherError<string>(`[Product.useEffect]: Product with id ${id} not found!`, navigate);
        }
    }, [id, products]);

    useEffect((): () => void => {
        activatedProduct && fetchImage(ENDPOINTS[API.PRODUCT_IMAGE](activatedProduct!.id));
        (!imageLoading && imageError) && handleHttpError(imageError, navigate);
        return () => !imageLoading && cleanImage();
    }, [activatedProduct, imageLoading]);

    const onOpenModal = (): void => setOpenModal(!openModal);

    const addProductToCart = (): void => {
        const product = products!.find((product: IProduct) => product.id === activatedProduct!.id);
        product && dispatch(action(ActionTypes.CART_UPDATE_LINES, { product: product, amount: 1, config: config_rdx } as ICartLine));
        dispatch(recalculateCart({ deliveryPrice: cart_rdx.present[WRAPPER_KEY].deliveryPrice }) as unknown as Action<TRecalculateCartArgs>);
        navigate(`../${ROUTE.CART}`);
    };

    const onCopyToClipboard = (): void => copyToClipboard(document.URL, setCopied);

    return activatedProduct ? (
        <div className="product-detail-content">
            <div className="row">
                <div className="col-lg-4 col-md-12">
                    <div className="product-detail-content-description">
                        <h3 className="display-4">{activatedProduct.name}</h3>
                        <span className="dash"></span>
                        <p className="product-detail-content-price">
                            <span className="price">{activatedProduct.price} {CURRENCY.EURO}</span>
                        </p>
                        <p className="product-about">{activatedProduct.description}</p>

                        <button className="btn btn-dark btn-lg" onClick={addProductToCart}>
                            <span><i className="fa fa-shopping-basket" aria-hidden="true"></i> Add to Cart!</span>
                        </button>

                        <div className="row">
                            <div className="btn-social btn-group-vertical mx-auto">
                                <button className="btn-social-share btn btn-light facebook">
                                    <FontAwesomeIcon icon={faFacebook} />
                                    <a href="#"> Share</a>
                                </button>
                                <button className="btn-social-share btn btn-light twitter">
                                    <FontAwesomeIcon icon={faTwitter} />
                                    <a href="#"> Share</a>
                                </button>
                                <button className="btn-social-share btn btn-light others" onClick={onCopyToClipboard}>
                                    <FontAwesomeIcon icon={faCopy} />
                                    {copied ? ' Copied' : ' Copy'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {openModal && <ProductModal doShow={openModal} activatedProduct={activatedProduct} />}

                <div className="col-lg-8 col-md-12">
                    <div className="product-detail-content-image">
                        <LazyLoad once>
                            {config_rdx.doMock ?
                                (
                                    <img className="img-fluid product-img"
                                        src={`/images/product${activatedProduct.id}.jpg`}
                                        onClick={onOpenModal}
                                        data-toggle="modal"
                                        alt="Product"
                                        loading="lazy" />
                                ) : (
                                    image && (
                                        <img className="img-fluid product-img"
                                            src={image}
                                            onClick={onOpenModal}
                                            data-toggle="modal"
                                            alt="Product"
                                            loading="lazy" />
                                    )
                                )
                            }
                        </LazyLoad>
                    </div>
                </div>

            </div>
        </div >
    ) : <Fragment></Fragment>
}

export default Product;