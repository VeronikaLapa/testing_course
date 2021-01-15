import React, {useEffect} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {connect, Provider} from 'react-redux'
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MenuBar from "./MenuBar";
import LogoutPage from "./LogoutPage";
import store from "../store/store";
import HelloPage from "./HelloPage";
import axios from "axios";
import getAuth from "../store/actions/getAuth";

function Router({getAuthAction}) {
    useEffect(() => {
        console.log("fetAuth mount");
        getAuthAction()
    });

    return (
            <BrowserRouter>
                <MenuBar/>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/signup" component={SignupPage}/>
                <Route exact path="/logout" component={LogoutPage}/>
                <Route exact path="/hello" component={HelloPage}/>
            </BrowserRouter>
    );
}

//<Route exact path="/dialogs" component={DialodsPage} />
//<Route exact path="/dialogs/:dialogId" component={DialogPage} />
//<Route exact path="/info" component={InfoPage} />

const mapDispatchToProps = dispatch => {
    return {
        getAuthAction: () => dispatch(getAuth())
    }
};

export default connect(null, mapDispatchToProps)(Router);
