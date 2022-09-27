import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import authSlice from "./authSlice";
export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    auth: authSlice.reducer,
  },
});
