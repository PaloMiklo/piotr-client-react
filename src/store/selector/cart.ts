import { store } from "../store";

export const selectCart = () => store.getState().cart.value;