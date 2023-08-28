import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse } from '../../model/httpResponse';
import http from '../http';

export const useHttpPatch = <P = unknown, R = unknown, E = unknown, C = unknown>(
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
                const { data } = await http.patch<R>(url, payload, config);
                setResponse(data);
                setLoading(false);
            } catch (error: unknown) {
                setError(error as AxiosError<E>);
                setLoading(false);
            }
        })();
    }, [url, payload, config]);

    return { response, error, loading };
};

export const useHttpPatchPostponedExecution = <P = unknown, R = unknown, E = unknown, C = unknown>(
    url: string,
    payload: P,
    config?: AxiosRequestConfig<C>
): IHttpResponse<R | null, AxiosError<E> | null> & TPatchExecutable<void> => {
    const [response, setResponse] = useState<R | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const patchData = async (): Promise<void> => {
        setLoading(true);

        try {
            const { data } = await http.patch<R>(url, payload, config);
            setResponse(data);
            setError(null);
        } catch (error: unknown) {
            setError(error as AxiosError<E>);
            setResponse(null);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, patchData };
};

type TPatchExecutable<T = void> = { patchData: () => Promise<T> };