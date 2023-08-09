import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse } from '../../model/httpResponse';
import http from '../http';

export const useHttpPut = <T = unknown, C = unknown>(url: string, payload: T, config?: AxiosRequestConfig<C>): IHttpResponse<T | null, AxiosError<T> | null> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await http.put<T>(url, payload, config);
                setResponse(data);
                setLoading(false);
            } catch (error: unknown) {
                setError(error as AxiosError<T>);
                setLoading(false);
            }
        })();
    }, [url, payload, config]);

    return { response, error, loading };
};


