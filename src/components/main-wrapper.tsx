import { useEffect } from 'react';
import { useData } from '../hook/useData';
import { connect } from 'react-redux';
import { IConfig } from '../model/config';
import { ReactElement } from 'react';
import { ActionTypes } from '../core/action';
import { useAppDispatch } from '../hook/app';
import { RootState, store } from '../store/store';
import { selectConfig } from '../selector/selector';

const MainWrapper = (): ReactElement<Element, string> => {
    const dispatch = useAppDispatch();
    const { data } = useData<IConfig>('/config.json');
    const config = selectConfig(store.getState())

    useEffect(() => {
        if (data) {
            dispatch({
                type: ActionTypes.CONFIG_INITIALIZE,
                payload: data,
            });
        }
    });

    console.log(config)

    return !data ? <p>Loading...</p> : <p>Loaded</p>
};

const mapStateToProps = (state: RootState): { config: IConfig; } => ({ config: state.config.value! });

export default connect(mapStateToProps)(MainWrapper);
