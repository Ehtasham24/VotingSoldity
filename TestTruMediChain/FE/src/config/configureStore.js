import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reducers from "../reducers";
import createLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const getMiddleware = () => {
  const middleware = [reduxThunk];
  return applyMiddleware(...middleware);
};

const persistConfig = {
  key: "key",
  storage: storage,
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...reducers,
  })
);

export default () => {
  let store = createStore(persistedReducer, getMiddleware());
  let persistor = persistStore(store);
  return { store, persistor };
};

// // configureStore.js
// import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import reduxThunk from "redux-thunk";
// // If you want logging middleware, you can add redux-logger
// import { createLogger } from "redux-logger";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// // Import your reducers (make sure they are combined under keys, e.g., stocks, Login, Register, etc.)
// import stockReducer from "../reducers/Stocks";
// // ... import other reducers (e.g., loginReducer, registerReducer)
// import loginReducer from "../reducers/Login";
// import registerReducer from "../reducers/Register";

// // Combine reducers
// const rootReducer = combineReducers({
//   stocks: stockReducer,
//   Login: loginReducer,
//   Register: registerReducer,
//   // ... add other reducers
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["stocks"], // persist stocks (or any slice you need)
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const getMiddleware = () => {
//   const middleware = [reduxThunk];
//   // Optionally add logger: middleware.push(createLogger());
//   return applyMiddleware(...middleware);
// };

// export default () => {
//   const store = createStore(persistedReducer, getMiddleware());
//   const persistor = persistStore(store);
//   return { store, persistor };
// };
