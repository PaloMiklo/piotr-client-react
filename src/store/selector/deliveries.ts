import { IDeliveryOption } from "../../model/config";
import { WRAPPER_KEY } from "../constant/slice";
import { store } from "../store";

export const selectDeliveries = (): IDeliveryOption[] => store.getState().delivery[WRAPPER_KEY];
