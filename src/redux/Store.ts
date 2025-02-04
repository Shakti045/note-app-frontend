import { configureStore } from "@reduxjs/toolkit";
import { authslice } from "./slices/auth";
import { noteslice } from "./slices/note";


export const store=configureStore({
  reducer:{
    auth:authslice.reducer,
    note:noteslice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

