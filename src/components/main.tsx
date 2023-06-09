import React from 'react';
import { useData } from '../hook/useData';

export const MainWrapper = () => {

    const { data } = useData('/config.json');
    const ConfigContext = React.createContext(data);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <ConfigContext.Provider value={data}></ConfigContext.Provider>
    );
};
