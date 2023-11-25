export const enum API {
    CONFIG = 0,
    PRODUCTS = 1,
    PRODUCT_IMAGE = 2
}

export const API_PREFIX = '/api';

export const ENDPOINTS: Record<API, <A = string>(arg?: A) => string> = {
    [API.CONFIG]: (): string => '/config.json',
    [API.PRODUCTS]: (): string => `${API_PREFIX}/product/list`,
    [API.PRODUCT_IMAGE]: <A = string>(productId: A): string => `${API_PREFIX}/product/${productId}/image`,
};
