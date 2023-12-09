import { FC, ReactElement, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleHttpError } from "../../common/error/error";
import { useHttpGet, useHttpGet__ } from "../../common/hook/http-get";
import { API, ENDPOINTS, PAID_OPTIONS_CODE } from "../../common/rest";
import { IBillingOption, ICart, IConfig, IDeliveryOption, IProduct } from "../../model/config";
import { LOCAL_STORAGE, LOCAL_STORAGE_KEY, LOCAL_STORAGE_OPERATION } from "../../storage/local";
import { ActionTypes } from "../../store/constant/action";
import ConfigContext from "../../store/context/config-ctx";
import { useAppDispatch } from "../../store/hook/hook";
import { cartInitial } from "../../store/initial/cart";
import { configInitial } from "../../store/initial/config";
import { selectDoMock } from "../../store/selector/config";
import { store } from "../../store/store";
import { action } from "../../store/util";
import Navbar from "../navbar/Navbar";

const Header: FC = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const doMock_rdx = useSelector(selectDoMock);

    const { response: configuration, error: configurationError, loading: loadingConfiguration } = useHttpGet<IConfig>(ENDPOINTS[API.CONFIG]());
    const { response: products$, error: productsError$, loading: loadingProducts$, fetchData: fetchProducts } = useHttpGet__<IProduct[]>(ENDPOINTS[API.PRODUCTS]());
    const { response: deliveries$, error: deliveriesError$, loading: loadingDeliveries$, fetchData: fetchDeliveries } = useHttpGet__<IDeliveryOption[]>(ENDPOINTS[API.DELIVERY](), { params: { codes: PAID_OPTIONS_CODE.SHIPPING } });
    const { response: billings$, error: billingsError$, loading: loadingBillings$, fetchData: fetchBillings } = useHttpGet__<IBillingOption[]>(ENDPOINTS[API.BILLING](), { params: { codes: PAID_OPTIONS_CODE.PAYMENT } });

    const [config, setConfig] = useState<IConfig>(configInitial);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [deliveries, setDeliveries] = useState<IDeliveryOption[]>([]);
    const [billings, setBillings] = useState<IBillingOption[]>([]);

    const initConfig = (): void => { configuration && dispatch(action(ActionTypes.CONFIG_INITIALIZE, configuration)); }
    (!loadingConfiguration && configurationError) && handleHttpError(configurationError);
    const loadConfig = (): void => { configuration && setConfig(configuration) }

    const loadDeliveries = (): void => { config && (doMock_rdx ? setDeliveries(config.delivery) : fetchDeliveries()); }
    const loadBillings = (): void => { config && (doMock_rdx ? setBillings(config.billing) : fetchBillings()); }
    const loadProducts = (): void => { config && (doMock_rdx ? setProducts(config.mocks.products) : fetchProducts()); }

    const initCart = (): void => {
        let initial = LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.RETRIEVE](LOCAL_STORAGE_KEY.CART) as ICart;
        initial ||= cartInitial;
        config && dispatch(action<ICart>(ActionTypes.CART_INITIALIZE, initial));
    }

    const initDelivery = (): void => { dispatch(action(ActionTypes.DELIVERIES_INITIALIZE, deliveries)) };
    const initBilling = (): void => { dispatch(action(ActionTypes.BILLINGS_INITIALIZE, billings)) };
    const initProduct = (): void => { products && dispatch(action<IProduct[]>(ActionTypes.PRODUCTS_INITIALIZE, products)); }

    useEffect((): void => {
        (!loadingDeliveries$ && deliveries$) && setDeliveries(deliveries$);
        (!loadingDeliveries$ && deliveriesError$) && handleHttpError(deliveriesError$, navigate)
    }, [deliveries$]);

    useEffect((): void => {
        (!loadingBillings$ && billings$) && setBillings(billings$);
        (!loadingBillings$ && billingsError$) && handleHttpError(billingsError$, navigate)
    }, [billings$]);

    useEffect((): void => {
        (!loadingProducts$ && products$) && setProducts(products$);
        (!loadingProducts$ && productsError$) && handleHttpError(productsError$, navigate)
    }, [products$]);

    useEffect((): void => initConfig(), [configuration]);
    useEffect((): void => loadConfig(), [configuration]);
    useEffect((): void => loadDeliveries(), [configuration]);
    useEffect((): void => loadBillings(), [configuration]);
    useEffect((): void => { deliveries.length && initDelivery() }, [deliveries]);
    useEffect((): void => { billings.length && initBilling() }, [billings]);
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
