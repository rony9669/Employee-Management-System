import { configerStore } from "@reduxjs/toolkit";
import Reducer from "./reducer";

export const store = configerStore({
  reducer: {
    app: Reducer,
  },
});
