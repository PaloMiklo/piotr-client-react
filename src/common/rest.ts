export const enum API {
    CONFIG = 0,
    PRODUCTS = 1,
    PRODUCT_IMAGE = 2
}

export const ENDPOINTS: Record<API, <A = string>(arg?: A) => string> = {
    [API.PRODUCTS]: (): string => '/api/product/list',
    [API.CONFIG]: (): string => '/config.json',
    [API.PRODUCT_IMAGE]: <A = string>(productId: A): string => `/api/product/${productId}/image`,
};
