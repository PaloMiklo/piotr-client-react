import { ReactElement } from 'react';
import { TProductProps } from './Product.config';
import './Product.scss';

const Product = ({ product }: TProductProps): ReactElement => {
    return (
        <h1>{product.id}</h1>
    );
}

export default Product;