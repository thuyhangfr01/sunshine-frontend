import { configureStore, combineReducers} from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import projectReducer from "./slices/projects";
import typeReducer from "./slices/types";
import statusReducer from "./slices/status";
import nameReducer from "./slices/name";
import contributionReducer from "./slices/contribution";
import formReducer from "./slices/form";
import reportReducer from "./slices/report";
import actifactReducer from "./slices/artifact";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['auth'] //khong luu thong tin ve auth vao local storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    projects: projectReducer,
    types: typeReducer,
    status: statusReducer,
    name: nameReducer,
    contributions: contributionReducer,
    artifacts: actifactReducer,
    form: formReducer,
    report: reportReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        }),
})

const persistor = persistStore(store)

// const reducer = {
//     auth: authReducer,
//     message: messageReducer,
//     projects: projectReducer,
//     types: typeReducer,
//     status: statusReducer,
//     name: nameReducer,
// }

// const store = configureStore({
//     reducer: reducer,
//     devTools: true,
// })

export {store, persistor};