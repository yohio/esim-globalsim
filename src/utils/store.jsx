import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../redux/slices/accountSlice";
import userReducer from "../redux/slices/userSlice";
import eSimReducer from "../redux/slices/eSimSlice";
import sourceReducer from "../redux/slices/sourceSlice";
import activeMenuReducer from "../redux/slices/activeMenuSlice";

export const store = configureStore({
  reducer: {
    activeMenu: activeMenuReducer,
    eSim: eSimReducer,
    sources: sourceReducer,
    accounts: accountReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false,
          // Add logger middleware in development
          ...(process.env.NODE_ENV === 'development' && {
              logger: console.log
          })
      })
});