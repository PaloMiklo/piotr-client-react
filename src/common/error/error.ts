import { AxiosError } from "axios";
import { ROUTE } from "../route";
import { SENTRY_ERROR } from "./sentry";

export const handleHttpError = <T = unknown>(error: AxiosError<T>, navigate?: (to: string) => void, routeError?: string) => {
    console.error(error);
    SENTRY_ERROR(error);
    routeError && navigate && navigate(routeError);
};

export const handleOtherError = <T = unknown>(error: T, navigate?: (to: string) => void, routeError = ROUTE.NOT_FOUND) => {
    console.error(error);
    SENTRY_ERROR(error);
    navigate && navigate(routeError);
};