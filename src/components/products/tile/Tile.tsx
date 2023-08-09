import { ReactElement } from 'react';
import { TProductProps } from '../product/Product.config';
import './Tile.scss';

const Tile = ({ product }: TProductProps): ReactElement => {
    return (
        <h1>{product.id}</h1>
    );
}

export default Tile;