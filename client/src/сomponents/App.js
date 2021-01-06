import React from 'react';
import {connect, Provider} from 'react-redux'
import store from "../store/store";
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
