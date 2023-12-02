import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse } from '../../model/httpResponse';
import http from '../http';

export const useHttpDelete = <R = unknown, E = unknown, C = unknown>(
    url: string,
    config?: AxiosRequestConfig<C>
): IHttpResponse<R | null, AxiosError<E> | null> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const { data } = await http.delete<R>(url, config);
                setResponse(data);
            } catch (error: unknown) {
                setError(error as AxiosError<E>);
            } finally {
                setLoading(false);
            }
        })();
    }, [url, config]);

    return { response, error, loading };
};

export const useHttpDelete__ = <R = unknown, E = unknown, C = unknown>(
    url: string,
    config?: AxiosRequestConfig<C>
): IHttpResponse<R | null, AxiosError<E> | null> & TDeleteExecutable<void> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const deleteData = async (): Promise<void> => {
        try {
            const { data } = await http.delete<R>(url, config);
            setResponse(data);
        } catch (error: unknown) {
            setError(error as AxiosError<E>);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, deleteData };
};

export const TDeleteExecutableKey = 'deleteData';
type TDeleteExecutable<T = void> = { [TDeleteExecutableKey]: () => Promise<T> };