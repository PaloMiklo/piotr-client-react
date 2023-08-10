import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse } from '../../model/httpResponse';
import http from '../http';

export const useHttpPost = <T = unknown, C = unknown>(url: string, payload: T, config?: AxiosRequestConfig<C>): IHttpResponse<T | null, AxiosError<T> | null> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const { data } = await http.post<T>(url, payload, config);
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


