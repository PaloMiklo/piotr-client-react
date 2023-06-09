import { useEffect, useState } from "react";
import { GENERAL_CONSTANTS } from "../core/constant";
import http from '../service/http';

export const useData = <T>(url: string) => {
    const [state, setState] = useState<T | undefined>();

    useEffect(() => {
        (async () => {
            const { data } = await http.get<T>(url);
            setState(data);
        })();
    }, [url]);

    return { [GENERAL_CONSTANTS.RESPONSE_KEY]: state };
};
