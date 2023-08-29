import { SLICE_NAMES } from "./slice";

type ActionTypes = {
    CONFIG_INITIALIZE: `${typeof SLICE_NAMES.CONFIG}/initialize`,
    CONFIG_RESET: `${typeof SLICE_NAMES.CONFIG}/reset`,

    PRODUCTS_INITIALIZE: `${typeof SLICE_NAMES.PRODUCTS}/initialize`,
    PRODUCTS_RESET: `${typeof SLICE_NAMES.PRODUCTS}/reset`,
    PRODUCTS_ADD: `${typeof SLICE_NAMES.PRODUCTS}/add`,
    PRODUCTS_REMOVE: `${typeof SLICE_NAMES.PRODUCTS}/remove`,

    CART_INITIALIZE: `${typeof SLICE_NAMES.CART}/initialize`,
    CART_UPDATE_LINES: `${typeof SLICE_NAMES.CART}/updateLines`,
    CART_RECALCULATE: `${typeof SLICE_NAMES.CART}/recalculate`,
    CART_UPDATE_DELIVERY: `${typeof SLICE_NAMES.CART}/updateDelivery`,
    CART_RESET: `${typeof SLICE_NAMES.CART}/reset`,
};

export const ActionTypes: ActionTypes = {
    CONFIG_INITIALIZE: `${SLICE_NAMES.CONFIG}/initialize`,
    CONFIG_RESET: `${SLICE_NAMES.CONFIG}/reset`,

    PRODUCTS_INITIALIZE: `${SLICE_NAMES.PRODUCTS}/initialize`,
    PRODUCTS_RESET: `${SLICE_NAMES.PRODUCTS}/reset`,
    PRODUCTS_ADD: `${SLICE_NAMES.PRODUCTS}/add`,
    PRODUCTS_REMOVE: `${SLICE_NAMES.PRODUCTS}/remove`,

    CART_INITIALIZE: `${SLICE_NAMES.CART}/initialize`,
    CART_UPDATE_LINES: `${SLICE_NAMES.CART}/updateLines`,
    CART_RECALCULATE: `${SLICE_NAMES.CART}/recalculate`,
    CART_UPDATE_DELIVERY: `${SLICE_NAMES.CART}/updateDelivery`,
    CART_RESET: `${SLICE_NAMES.CART}/reset`,
};
