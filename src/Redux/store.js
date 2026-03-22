import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import SearchReducer from "./searchSlice"
import { persistStore, persistReducer } from "redux-persist"
import CartReducer from "./cartSlice"
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key))
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value)
    return Promise.resolve()
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
    return Promise.resolve()
  }
}

const persistAuthConfig = {
  key: "auth",
  storage,
}

const persistCartConfig = {
  key: "cart",
  storage,
}

const persistedAuth = persistReducer(persistAuthConfig, authReducer)
const persistedCart = persistReducer(persistCartConfig, CartReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    search : SearchReducer,
    cart : persistedCart,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store)