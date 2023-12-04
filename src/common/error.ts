import { AxiosError } from "axios";

export const handleHttpError = <T = unknown>(error: AxiosError<T>, navigate?: (to: string) => void, routeError?: string) => {
    console.error('TODO -> alert http error', error);
    routeError && navigate && navigate(routeError);
};

export const handleOtherError = <T = unknown>(error: T, navigate?: (to: string) => void, routeError = '/not-found') => {
    console.error('TODO -> alert other error', error);
    navigate && navigate(routeError);
};