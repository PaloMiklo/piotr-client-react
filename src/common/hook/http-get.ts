import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IHttpResponse, IHttpResponseWrapper } from '../../model/httpResponse';
import http from '../http';

export const useHttpGet = <R = unknown, E = unknown, C = unknown>(
    url: string,
    config?: AxiosRequestConfig<C>
): IHttpResponse<R | null, AxiosError<E> | null> => {
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

export const useHttpGet__ = <R = unknown, E = unknown, C = unknown>(
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

export const useHttpGetBlob = <T = Blob, E = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D> & { doMock?: boolean },
): IHttpResponse<string | null, AxiosError<E> | null> => {
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect((): () => void => {
        let blobUrl: string | null = null;
        (async (): Promise<void> => {
            if (config?.doMock) {
                setLoading(false);
            } else {
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
            }
        })();
        return (): void => { !config?.doMock && blobUrl && URL.revokeObjectURL(blobUrl) };
    }, []);

    return { response, error, loading };
};

export const useHttpGetBlob__ = <T = Blob, E = unknown, D = unknown>(
    config?: AxiosRequestConfig<D> & { doMock?: boolean }
): IHttpResponse<string | null, AxiosError<E> | null> & TGetBlobExecutables<void> => {
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<AxiosError<E> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    let blobUrl: string;

    const fetchDataBlob = async (url: string): Promise<void> => {
        if (config?.doMock) {
            setLoading(false);
        } else {
            setLoading(true);

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
        }
    };

    const cleanUpBlob = (): void => { !config?.doMock && blobUrl && URL.revokeObjectURL(blobUrl) };

    return { response, error, loading, fetchDataBlob, cleanUpBlob };
};

const TGetBlobExecutableKey = 'fetchDataBlob';
const TGetBlobExecutableCleanupKey = 'cleanUpBlob';
type TGetBlobExecutables<EXR1 = void, EXR2 = void> = { [TGetBlobExecutableKey]: (url: string) => Promise<EXR1>;[TGetBlobExecutableCleanupKey]: () => EXR2 };