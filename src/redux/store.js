import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

//! Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middlewares));

//! Then run the saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
