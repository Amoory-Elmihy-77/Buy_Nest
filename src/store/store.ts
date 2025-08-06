import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
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
import ordersSlice from "./orders/ordersSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cartSlice", "authSlice"],
};

const authPersistConfig = {
  key: "authSlice",
  storage,
  whitelist: ["user", "accessToken"],
};

const cartPersistConfig = {
  key: "cartSlice",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  authSlice: persistReducer(authPersistConfig, authSlice),
  categoriesSlice,
  productsSlice,
  ordersSlice,
  cartSlice: persistReducer(cartPersistConfig, cartSlice),
  wishlistSlice: wishlistSlice,
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
