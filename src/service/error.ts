import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const handleError = <T = unknown>(error: AxiosError<T>, routeError?: string) => {
    console.error('TODO -> alert error', error);
    const navigate = useNavigate();
    routeError && navigate(routeError);
};