import React, { useEffect, useState } from 'react';
import { IConfig } from '../model/config';
import http from '../service/http.service';

const MainWrapper = () => {
    const [config, setConfig] = useState<IConfig | null>(null);

    const ConfigContext = React.createContext(config);

    useEffect(() => {
        (async () => {
            const { data } = await http.get<IConfig>('/config.json');
            setConfig(data);
        })();
    }, []);

    if (!config) {
        return <div>Loading...</div>;
    }

    return (
        <ConfigContext.Provider value={config}></ConfigContext.Provider>
    );
};

export default MainWrapper;
