// here we are making api for calling backend using axios and 
// making action(means what to do ) in redux

import axios from "axios"
import * as action from "../constants/productConstant.js"

const url = "";

export const getProducts = () => async (dispatch) => {
    try {// this is an api call
        const { data } = await axios.get(`${url}/products`);  // here data is an array of multiple object
        dispatch({ type: action.GET_PRODUCT_SUCCESS, payload: data}); //dispatch always call reducer
        // dispatch k andar jo bhi hai usee action object kehte hai
    }catch(error) {
        // console.log("Error while calling products api");
        dispatch({ type: action.GET_PRODUCT_FAIL, payload: error.response}); 
        
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try{
        const { data } = await axios.get(`${url}/product/${id}`);
        dispatch({ type: action.GET_PRODUCT_DETAIL_SUCCESS, payload: data});
    } catch(error) {
        dispatch({ type: action.GET_PRODUCT_DETAIL_FAIL, payload: error.response});
    }
}
