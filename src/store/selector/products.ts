import { store } from "../store";

export const selectProducts = () => store.getState().products.value;
