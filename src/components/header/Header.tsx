import { ReactElement, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleHttpError } from "../../common/error";
import { useHttpGet, useHttpGet__ } from "../../common/hook/http-get";
import { API, ENDPOINTS, PAYED_OPTIONS_CODE } from "../../common/rest";
import { ICart, IConfig, IDeliveryOption, TProductRowDto } from "../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_KEY, LOCAL_STORAGE_OPERATION } from "../../storage/local-storage";
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
    const { response: productsFromApi, error: productsError, loading: loadingProducts, fetchData: fetchProducts } = useHttpGet__<TProductRowDto[]>(ENDPOINTS[API.PRODUCTS]());
    const { response: deliveriesFromApi, error: deliveriesError, loading: loadingDeliveries, fetchData: fetchDeliveries } = useHttpGet__<IDeliveryOption[]>(ENDPOINTS[API.DELIVERIES](), { params: { codes: PAYED_OPTIONS_CODE.SHIPPING } });

    const [config, setConfig] = useState<IConfig>(configInitial);
    const [products, setProducts] = useState<TProductRowDto[]>([]);
    const [deliveries, setDeliveries] = useState<IDeliveryOption[]>([]);

    const initConfig = (): void => { configuration && dispatch(action(ActionTypes.CONFIG_INITIALIZE, configuration)); }
    (!loadingConfiguration && configurationError) && handleHttpError(configurationError);
    const loadConfig = (): void => { configuration && setConfig(configuration) }

    const loadDeliveries = (): void => { config && (doMock_rdx ? setDeliveries(config.delivery) : fetchDeliveries()); }
    const loadProducts = (): void => { config && (doMock_rdx ? setProducts(config.mocks.products) : fetchProducts()); }

    const initCart = (): void => {
        let initial = LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.RETRIEVE](LOCAL_STORAGE_KEY.CART) as ICart;
        initial ||= cartInitial;
        config && dispatch(action<ICart>(ActionTypes.CART_INITIALIZE, initial));
    }

    const initDelivery = (): void => { dispatch(action(ActionTypes.DELIVERIES_INITIALIZE, deliveries)) };
    const initProduct = (): void => { products && dispatch(action<TProductRowDto[]>(ActionTypes.PRODUCTS_INITIALIZE, products)); }

    useEffect((): void => {
        (!loadingDeliveries && deliveriesFromApi) && setDeliveries(deliveriesFromApi);
        (!loadingDeliveries && deliveriesError) && handleHttpError(deliveriesError!, navigate)
    }, [deliveriesFromApi]);

    useEffect((): void => {
        (!loadingProducts && productsFromApi) && setProducts(productsFromApi);
        (!loadingProducts && productsError) && handleHttpError(productsError!, navigate)
    }, [productsFromApi]);

    useEffect((): void => initConfig(), [configuration]);
    useEffect((): void => loadConfig(), [configuration]);
    useEffect((): void => loadDeliveries(), [configuration]);
    useEffect((): void => initDelivery(), [deliveries]);
    useEffect((): void => loadProducts(), [config]);
    useEffect((): void => initCart(), [config]);
    useEffect((): void => { products.length && initProduct() }, [products]);


    return (
        <Provider store={store}>
            <ConfigContext.Provider value={config}>
                <Navbar />
            </ConfigContext.Provider>
        </Provider >
    )
}

export default Header;
