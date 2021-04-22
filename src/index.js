import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import moment from "moment";
import App from "./App";
import configureStore from "./store/configure-store";
import "../public/assets/css/style.css";

const initialStore = {
    login: {
        error: "",
        token: false
    },
    DCRList: {
        toggleHeader: true,
        isFull: false
    },
    Calendar: {
        selectedDate: moment().format("YYYY-MM-DD")
    }
};
let store = configureStore(initialStore);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
