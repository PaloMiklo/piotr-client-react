import { createContext, useContext } from 'react';
import { configInitial } from '../initial/config';
import { IConfig } from '../model/config';

const ConfigContext = createContext<IConfig>(configInitial);

export const useConfig = () => {
    return useContext(ConfigContext);
};

export default ConfigContext;
