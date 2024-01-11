import { configureStore } from "@reduxjs/toolkit";
import statesSlice from "./features/statesSlice";


const store = configureStore({
  reducer: {
    states: statesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
