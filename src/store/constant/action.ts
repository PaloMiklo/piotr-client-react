import { SLICE_NAMES } from "./slice";

export const ActionTypes: Record<string, string> = {
    CONFIG_INITIALIZE: `${SLICE_NAMES.CONFIG}/initialize`,
    CONFIG_RESET: `${SLICE_NAMES.CONFIG}/reset`,

    PRODUCTS_INITIALIZE: `${SLICE_NAMES.PRODUCTS}/initialize`,
    PRODUCTS_RESET: `${SLICE_NAMES.PRODUCTS}/reset`,
    PRODUCTS_ADD: `${SLICE_NAMES.PRODUCTS}/add`,
    PRODUCTS_REMOVE: `${SLICE_NAMES.PRODUCTS}/remove`,
}