import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse } from '../../model/httpResponse';
import http from '../http';

export const useHttpPost = <P = unknown, R = unknown, E = unknown, C = unknown>(
    url: string,
    payload: P,
    config?: AxiosRequestConfig<C>
): IHttpResponse<R | null, AxiosError<E> | null> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const { data } = await http.post<R>(url, payload, config);
                setResponse(data);
            } catch (error: unknown) {
                setError(error as AxiosError<E>);
            } finally {
                setLoading(false);
            }
        })();
    }, [url, payload, config]);

    return { response, error, loading };
};

export const useHttpPost__ = <P = unknown, R = unknown, E = unknown, C = unknown>(
    url: string,
    payload: P,
    config?: AxiosRequestConfig<C>
): IHttpResponse<R | null, AxiosError<E> | null> & TPostExecutable<void> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const postData = async (): Promise<void> => {
        try {
            const { data } = await http.post<R>(url, payload, config);
            setResponse(data);
        } catch (error: unknown) {
            setError(error as AxiosError<E>);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, postData };
};

export const TPostExecutableKey = 'postData';
type TPostExecutable<T = void> = { [TPostExecutableKey]: () => Promise<T> };