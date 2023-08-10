import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { handleOtherError } from '../../../common/error';
import { IProduct } from '../../../model/config';
import { selectProducts } from '../../../store/selector/products';
import './Product.scss';

const Product = (): ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loadedProducts = useSelector(selectProducts);
    const [products, setProducts] = useState<IProduct[]>();
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect((): void => { setProducts(loadedProducts); }, [loadedProducts]);

    useEffect((): void => {
        if (products && products.length) {
            const foundProduct = id ? products.find((product: IProduct) => product.id === +id) : null;
            foundProduct ? setProduct(foundProduct) : handleOtherError<string>(`Product with id ${id} not found!`, navigate);
        }
    }, [id, products]);

    return product ? (
        <div className="product-detail-content">
            <div className="row">
                <div className="col-lg-4 col-md-12">
                    <div className="product-detail-content-description">
                        <h3 className="display-4">{product.name}</h3>
                        <span className="dash"></span>
                        <p className="product-detail-content-price">
                            <span className="price">{product.price} EUR</span>
                        </p>
                        <p className="product-about">{product.description}</p>

                        <button className="btn btn-dark btn-lg">
                            <span><i className="fa fa-shopping-basket" aria-hidden="true"></i> Add to Cart!</span>
                        </button>

                        <div className="row">
                            <div className="btn-social btn-group-vertical mx-auto">
                                <button className="btn-social-share btn btn-light">
                                    <i className="fa fa-facebook-square"></i>
                                    <a href="#"> Share</a>
                                </button>
                                <button className="btn-social-share btn btn-light">
                                    <i className="fa fa-facebook-square"></i>
                                    <a href="#"> Share</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 col-md-12">
                    <div className="product-detail-content-image">
                        <img className="img-fluid product-img" src={`/images/${product.imagePath}`} data-toggle="modal" alt="Product" loading="lazy" />
                    </div>
                </div>

            </div>
        </div>
    ) : <></>
}

export default Product;