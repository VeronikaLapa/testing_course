import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {connect, Provider} from 'react-redux'
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MenuBar from "./MenuBar";
import LogoutPage from "./LogoutPage";
import store from "../store/store";
import HelloPage from "./HelloPage";
import axios from "axios";
import Router from "./Router";

function App(token) {
    return (
        <Provider store={store}>
        <Router/>
        </Provider>
    );
}

//<Route exact path="/dialogs" component={DialodsPage} />
//<Route exact path="/dialogs/:dialogId" component={DialogPage} />
//<Route exact path="/info" component={InfoPage} />

export default App;
