import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";  // middleware,it's needed when we call an api through the help of redux
import {composeWithDevTools} from "redux-devtools-extension";  // for storing the data to the extension of redux

import { getProductDetailsReducer, getProductsReducer } from "./reducers/productReducer.js";
import { cartReducer } from "./reducers/cartReducer"


const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
})

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;