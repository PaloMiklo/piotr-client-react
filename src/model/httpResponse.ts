export const HTTP_KEYS = { RESPONSE: 'response', ERROR: 'error', LOADING: 'loading' } as const;
export interface IHttpResponse<T = unknown, E = unknown> { [HTTP_KEYS.RESPONSE]: T;[HTTP_KEYS.ERROR]: E;[HTTP_KEYS.LOADING]: boolean; };

interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IHttpResponseWrapper<R = unknown> {
    content: R;
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    empty: boolean;
}
