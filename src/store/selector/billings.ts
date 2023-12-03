import { IBillingOption } from "../../model/config";
import { WRAPPER_KEY } from "../constant/slice";
import { store } from "../store";

export const selectBillings = (): IBillingOption[] => store.getState().billing[WRAPPER_KEY];
