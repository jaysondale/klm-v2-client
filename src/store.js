import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "reducers";
const middleware = [thunk];
const store = configureStore(
    {
        reducer,
        devTools: composeWithDevTools(applyMiddleware(...middleware))
    }
);
export default store;