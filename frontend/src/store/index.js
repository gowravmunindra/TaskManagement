import {configureStore} from "@reduxjs/toolkit"; //npm i react-redux, npm i @reduxjs/toolkit
import authReducer from "./auth";
const store = configureStore({
    reducer:{
        auth:authReducer,
    },
});
export default store;