import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import userReducer from "../Slice/AsynThunkReducers/userSlice";
import cartReducer from "../Slice/AsynThunkReducers/cartSlice";
import logger from "redux-logger";
import categoryReducer from "../Slice/AsynThunkReducers/categoriesSlice";
import storage from "redux-persist/lib/storage";
import directoryReducer from "../Slice/AsynThunkReducers/directoriesSlice";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";
import categoriesSagaSlice from "../Slice/SagaReducers/categories.Saga.Slice";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["carts"], //since the user state is manage by authstatelistner
};
const reducers = combineReducers({
  users: userReducer,
  carts: cartReducer,
  categories: categoryReducer,
  directories: directoryReducer,
  categoriesSaga:categoriesSagaSlice
  
});
const persistedReducer = persistReducer(persistConfig, reducers);

// const middleware = [process.env.NODE_ENV === 'development' && logger,]
// const composedEnhancers=compose(applyMiddleware(...middleware))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    let middleware = getDefaultMiddleware({
      serializableCheck: false,
    });

    if (process.env.NODE_ENV === "development") {
      middleware = middleware.concat(logger);
    }
    middleware = middleware.concat(sagaMiddleware);
    return middleware;
  },
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

/**
 *  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger)
 */
