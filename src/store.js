import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import projectReducer from "./slices/projects";
import typeReducer from "./slices/types";
const reducer = {
    auth: authReducer,
    message: messageReducer,
    projects: projectReducer,
    types: typeReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;