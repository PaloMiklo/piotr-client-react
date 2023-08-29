import { StateWithHistory } from "redux-undo";
import { ICartStateWrapper } from "../slice/cart";
import { store } from "../store";

export const selectCart = (): StateWithHistory<ICartStateWrapper> => store.getState().cart;