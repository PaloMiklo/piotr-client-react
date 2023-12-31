import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse } from '../../model/httpResponse';
import http from '../http';

export const useHttpPut = <P = unknown, R = unknown, E = unknown, C = unknown>(
    url: string,
    payload: P,
    config?: AxiosRequestConfig<C>): IHttpResponse<R | null, AxiosError<E> | null> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const { data } = await http.put<R>(url, payload, config);
                setResponse(data);
                data && setLoading(false);
            } catch (error: unknown) {
                setError(error as AxiosError<E>);
                error && setLoading(false);
            }
        })();
    }, [url, payload, config]);

    return { response, error, loading };
};

export const useHttpPut__ = <P = unknown, R = unknown, E = unknown, C = unknown>(
    url: string,
    payload: P,
    config?: AxiosRequestConfig<C>
): IHttpResponse<R | null, AxiosError<E> | null> & TPutExecutable<void> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const putData = async (): Promise<void> => {
        try {
            const { data } = await http.put<R>(url, payload, config);
            setResponse(data);
        } catch (error: unknown) {
            setError(error as AxiosError<E>);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, putData };
};

export const TPutExecutableKey = 'putData';
type TPutExecutable<T = void> = { [TPutExecutableKey]: () => Promise<T> };