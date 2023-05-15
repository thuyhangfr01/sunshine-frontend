import { configureStore } from '@reduxjs/toolkit'
import { PersistGate } from 'redux-persist/integration/react'
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {store, persistor} from "./store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </React.Fragment>
);

