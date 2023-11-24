import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { GENERAL_CONSTANTS } from '../../core/constant';
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
            } catch (error: unknown) {
                setError(error as AxiosError<E>);
            } finally {
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

const TGetExecutableKey = 'fetchData';
type TGetExecutable<T = void> = { [TGetExecutableKey]: () => Promise<T> };

export const useHttpGetBlob = <T = Blob, E = unknown, C = unknown>(
    url: string,
    config?: AxiosRequestConfig<C>): IHttpResponse<string | null, AxiosError<E> | null> => {
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): () => void => {
        let blobUrl: string;
        (async (): Promise<void> => {
            try {
                const { data } = await http.get<T>(url, { ...config, responseType: 'blob' });
                if (data instanceof Blob) {
                    blobUrl = URL.createObjectURL(data);
                    setResponse(blobUrl);
                } else {
                    setError(new AxiosError('Response type is not a blob-like!'));
                }
            } catch (error: unknown) {
                setError(error as AxiosError<E>);
            } finally {
                setLoading(false);
            }
        })();
        return (): void | typeof GENERAL_CONSTANTS.EMPTY_STRING => (blobUrl) && URL.revokeObjectURL(blobUrl);
    }, [url, config]);

    return { response, error, loading };
};
