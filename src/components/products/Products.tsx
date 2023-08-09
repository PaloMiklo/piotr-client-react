import { ReactElement, useState, useEffect } from "react";
import { IProduct } from "../../model/config";
import { selectConfig } from "../../store/selector/selector";
import { store } from "../../store/store";
import Product from "./product/Product";
import Tile from "./tile/Tile";

const Products = (): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const productsFromRedux = selectConfig(store.getState());
        setProducts(productsFromRedux.mocks.products)
    }, [products]);

    return (
        <div>
            {
                products.map((product: IProduct) => (
                    <div key={product.id}>
                        <Tile product={product} />
                    </div>
                ))
            }

        </div>
    )
}

export default Products;
