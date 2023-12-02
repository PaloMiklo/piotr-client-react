import { IProduct } from "../../model/config";
import { store } from "../store";

export const selectProducts = (): IProduct[] => store.getState().products.value;
