import { ReactElement, useEffect } from "react";
import { Provider } from "react-redux";
import ConfigContext from "../../context/config-ctx";
import { ActionTypes } from "../../core/action";
import { useAppDispatch } from "../../hook/app";
import { useHttpGet } from "../../hook/useHttpGet";
import { IConfig } from "../../model/config";
import { handleError } from "../../service/error";
import { store } from "../../store/store";
import Navbar from "../navbar/Navbar";

const Header = (): ReactElement<Element, string> => {
    const dispatch = useAppDispatch();
    const { response: data, error, loading } = useHttpGet<IConfig>('/config.json');
    const configFromRedux = store.getState().config.value;


    useEffect(() => {
        if (data) {
            dispatch({
                type: ActionTypes.CONFIG_INITIALIZE,
                payload: data,
            });
        }
    });

    if (loading) {
        return <p>Loading...</p>
    }

    if (!loading && error) {
        handleError<IConfig>(error)
    }

    return (
        <Provider store={store}>
            <ConfigContext.Provider value={configFromRedux}>
                <Navbar />
            </ConfigContext.Provider>
        </Provider>
    )
};

export default Header;
