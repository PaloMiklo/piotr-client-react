import { useEffect } from 'react';
import { useData } from '../../hook/useData';
import { connect } from 'react-redux';
import { IConfig } from '../../model/config';
import { ReactElement } from 'react';
import { ActionTypes } from '../../core/action';
import { useAppDispatch } from '../../hook/app';
import Main from '../main/main';
import { Provider } from 'react-redux';
import ConfigContext from '../../context/config-ctx';
import { store } from '../../store/store';

const MainWrapper = (): ReactElement<Element, string> => {
    const dispatch = useAppDispatch();
    const { data } = useData<IConfig>('/config.json');
    const configFromRedux = store.getState().config.value;

    useEffect(() => {
        if (data) {
            dispatch({
                type: ActionTypes.CONFIG_INITIALIZE,
                payload: data,
            });
        }
    });

    return !data ? <p>Loading...</p> : (
        <Provider store={store}>
            <ConfigContext.Provider value={configFromRedux}>
                <Main></Main>
            </ConfigContext.Provider>
        </Provider>
    )
};

export default MainWrapper;
