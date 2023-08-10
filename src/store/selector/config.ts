import { store } from "../store";

export const selectConfig = () => store.getState().config.value;
export const selectDoMock = () => store.getState().config.value.doMock;