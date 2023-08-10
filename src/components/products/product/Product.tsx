import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleOtherError } from '../../../common/error';
import { IProduct } from '../../../model/config';
import { selectConfig } from '../../../store/selector/selector';
import { store } from '../../../store/store';
import Loading from '../../loading/Loading';

const Product = (): ReactElement => {
    const { id } = useParams();

    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect((): void => {
        const productsFromRedux = selectConfig(store.getState()).mocks.products;
        const product = id ? productsFromRedux.find((product) => product.id === +id) : null;
        product ? setProduct(product) : handleOtherError<string>(`Product with id ${id} not found!`, 'not-found'); // todo: not-found fallbackpage
    }, [id]);

    if (product) {
        return (
            <div className='container'>
                <h1>Product page of product with id {id}</h1>
                <h2>{product.name}</h2>
            </div>
        );
    }
    return <Loading />
}

export default Product;