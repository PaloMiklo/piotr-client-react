import { IProduct } from "../../model/config";
import { WRAPPER_KEY } from "../constant/slice";
import { store } from "../store";

export const selectProducts = (): IProduct[] => store.getState().products[WRAPPER_KEY];
