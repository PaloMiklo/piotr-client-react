import { store } from "../store";

// use with useSelector
export const selectConfig = () => store.getState().config.value;
