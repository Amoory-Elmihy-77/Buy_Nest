import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import cartSlice from "./cart/cartSlice";
import wishlistSlice from "./wishlist/wishlistSlice";
import authSlice from "./auth/authSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["cartSlice", "authSlice"],
};

const authPersistConfig = {
  key: "authSlice",
  storage,
  whiteList: ["user", "accessToken"],
};
const cartPersistConfig = {
  key: "cartSlice",
  storage,
  whiteList: ["items"],
};

const rootReducer = combineReducers({
  categoriesSlice,
  productsSlice,
  cartSlice: persistReducer(cartPersistConfig, cartSlice),
  wishlistSlice: wishlistSlice,
  authSlice: persistReducer(authPersistConfig, authSlice),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
