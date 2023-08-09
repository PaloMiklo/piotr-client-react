export const HTTP_KEYS = { RESPONSE: 'response', ERROR: 'error', LOADING: 'loading' } as const;
export interface IHttpResponse<T = unknown, E = unknown> { [HTTP_KEYS.RESPONSE]: T;[HTTP_KEYS.ERROR]: E;[HTTP_KEYS.LOADING]: boolean; };
