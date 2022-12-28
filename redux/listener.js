import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleChangeAction, updateAction } from "./reducer";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: toggleChangeAction,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(updateAction(action.payload));
  },
});
