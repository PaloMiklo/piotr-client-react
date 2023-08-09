import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse } from '../model/httpResponse';
import http from '../service/http';

export const useHttpDelete = <T = unknown, C = unknown>(url: string, config?: AxiosRequestConfig<C>): IHttpResponse<T | null, AxiosError<T> | null> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await http.delete<T>(url, config);
                setResponse(data);
                setLoading(false);
            } catch (error: unknown) {
                setError(error as AxiosError<T>);
                setLoading(false);
            }
        })();
    }, [url, config]);

    return { response, error, loading };
};


