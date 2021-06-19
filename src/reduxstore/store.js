import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import AuthReducer from "./AuthReducer"
import CartReducer from "./CartReducer"
import createSaga from "redux-saga"
import MainSaga from "../sagas/sagas";

let middle = store => next => action => {
    let date = new Date();
    console.log("Dispatch action: " + action.type + " called Time: " + date);
    next(action);
}

var reducers = combineReducers({AuthReducer, CartReducer});

var sagaMiddleware = createSaga();

let store = createStore(reducers, applyMiddleware(middle, thunk, sagaMiddleware));

sagaMiddleware.run(MainSaga)

export default store