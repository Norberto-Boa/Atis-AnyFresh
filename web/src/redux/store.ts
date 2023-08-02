import { configureStore } from "@reduxjs/toolkit";
import SaleReducer from "./sales/salesSlice";

const store = configureStore({
  reducer: {
    sales: SaleReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;