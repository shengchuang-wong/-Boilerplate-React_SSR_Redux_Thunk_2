import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import Layout from "../common/Layout";
// import "../sass/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'client/reducers';
import axios from 'axios';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const axiosInstance = axios.create({});
const store = createStore(reducers, window.INITIAL_STATE, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance), logger)));

renderMethod(
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);