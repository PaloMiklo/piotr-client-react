import { ReactElement } from 'react';
import { TProductProps } from '../product/Product.config';
import './Tile.scss';

const Tile = ({ product }: TProductProps): ReactElement => {
    return (
        <div className="col-sm-12 col-lg-3 product-tile">
            <img
                className="img-fluid mx-auto"
                src={product.imagePath}
                alt=""
            />
            <a href="#">
                <div className="overlay">
                    <div className="info">
                        <span className="product-info-name">{product.name}</span>
                        <span className="dash"></span>
                        <p className="product-info-price">
                            <span className="price">{product.price} EUR</span>
                        </p>
                    </div>
                </div>
            </a>
            <div className="buttons">
                <button className="btn mw-100">
                    <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span> buy now</span>
                </button>
            </div>
        </div>
    );
}

export default Tile;
