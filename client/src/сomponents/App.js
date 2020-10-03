import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import { Provider } from 'react-redux'
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MenuBar from "./MenuBar";
import LogoutPage from "./LogoutPage";
import store from "../store/store";
import HelloPage from "./HelloPage";

function App() {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <MenuBar/>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/signup" component={SignupPage}/>
            <Route exact path="/logout" component={LogoutPage}/>
            <Route exact path="/hello" component={HelloPage}/>
        </BrowserRouter>
        </Provider>
    );
}

//<Route exact path="/dialogs" component={DialodsPage} />
//<Route exact path="/dialogs/:dialogId" component={DialogPage} />
//<Route exact path="/info" component={InfoPage} />

export default App;
