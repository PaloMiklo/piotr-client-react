import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { EffectCallback, MutableRefObject, useEffect, useRef, useState } from 'react';
import { IHttpResponse } from '../../model/httpResponse';
import http from '../http';

export const useHttpGet = <T = unknown, C = unknown>(url: string, config?: AxiosRequestConfig<C>): IHttpResponse<T | null, AxiosError<T> | null> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const { data } = await http.get<T>(url, config);
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

export const useHttpGetPostponedExecution = <T = unknown, C = unknown>(url: string, config?: AxiosRequestConfig<C>): IHttpResponse<T | null, AxiosError<T> | null> & { fetchData: () => Promise<void> } => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError<T> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (): Promise<void> => {
        setLoading(true);

        try {
            const { data } = await http.get<T>(url, config);
            setResponse(data);
            setError(null);
        } catch (error: unknown) {
            setError(error as AxiosError<T>);
            setResponse(null);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData };
};







