import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse, IHttpResponseWrapper } from '../../model/httpResponse';
import http from '../http';

export const useHttpGet = <R = unknown, E = unknown, C = unknown>(
    url: string,
    config?: AxiosRequestConfig<C>): IHttpResponse<R | null, AxiosError<E> | null> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const { data } = await http.get<R>(url, config);
                setResponse(data);
                setLoading(false);
            } catch (error: unknown) {
                setError(error as AxiosError<E>);
                setLoading(false);
            }
        })();
    }, [url, config]);

    return { response, error, loading };
};

export const useHttpGetPostponedExecution = <R = unknown, E = unknown, C = unknown>(
    url: string,
    config?: AxiosRequestConfig<C>
): IHttpResponse<R | null, AxiosError<E> | null> & TGetExecutable<void> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (): Promise<void> => {
        setLoading(true);

        try {
            const { data } = await http.get<IHttpResponseWrapper<R>>(url, config);
            setResponse(data.content);
            setError(null);
        } catch (error: unknown) {
            setError(error as AxiosError<E>);
            setResponse(null);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData };
};

export const TGetExecutableKey = 'fetchData';
type TGetExecutable<T = void> = { [TGetExecutableKey]: () => Promise<T> };