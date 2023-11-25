import { ReactElement, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleHttpError } from "../../common/error";
import { useHttpGet, useHttpGetPostponedExecution } from "../../common/hook/http-get";
import { API, ENDPOINTS } from "../../common/rest";
import { ICart, IConfig, IProduct } from "../../model/config";
import { ActionTypes } from "../../store/constant/action";
import ConfigContext from "../../store/context/config-ctx";
import { useAppDispatch } from "../../store/hook/hook";
import { cartInitial } from "../../store/initial/cart";
import { configInitial } from "../../store/initial/config";
import { selectDoMock } from "../../store/selector/config";
import { store } from "../../store/store";
import { action } from "../../store/util";
import Navbar from "../navbar/Navbar";

const Header = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const doMock_rdx = useSelector(selectDoMock);

    const { response: configuration, error: configurationError, loading: loadingConfiguration } = useHttpGet<IConfig>(ENDPOINTS[API.CONFIG]());
    const { response: productsFromApi, error: productsError, loading: loadingProducts, fetchData: fetchProducts } = useHttpGetPostponedExecution<IProduct[]>(ENDPOINTS[API.PRODUCTS]());

    const [config, setConfig] = useState<IConfig>(configInitial);
    const [products, setProducts] = useState<IProduct[]>([]);

    const initConfig = (): void => { configuration && dispatch(action(ActionTypes.CONFIG_INITIALIZE, configuration)); }
    const loadConfig = (): void => { configuration && setConfig(configuration) }
    const loadProducts = (): void => {
        if (config) {
            if (doMock_rdx) {
                setProducts(config.mocks.products);
            } else {
                fetchProducts();
            };
        }
    }
    const initCart = (): void => { config && dispatch(action<ICart>(ActionTypes.CART_INITIALIZE, cartInitial)); }
    const initProduct = (): void => { products && dispatch(action<IProduct[]>(ActionTypes.PRODUCTS_INITIALIZE, products)); }

    useEffect((): void => {
        (!loadingProducts && productsFromApi) && setProducts(productsFromApi);
        (!loadingProducts && productsError) && handleHttpError(productsError!, navigate)
    }, [productsFromApi]);

    useEffect((): void => initConfig(), [configuration]);
    useEffect((): void => loadConfig(), [configuration]);
    useEffect((): void => loadProducts(), [config]);
    useEffect((): void => initCart(), [config]);
    useEffect((): void => initProduct(), [products]);

    (!loadingConfiguration && configurationError) && handleHttpError(configurationError)

    return (
        <Provider store={store}>
            <ConfigContext.Provider value={config}>
                <Navbar />
            </ConfigContext.Provider>
        </Provider >
    )
}

export default Header;
