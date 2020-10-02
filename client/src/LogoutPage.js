import React, {Component, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "./store/actions/userActions";


function LogoutPage(props) {
    useEffect(() => {
        props.logoutAction();
    });

    return (
        <Redirect to="/"/>
    );
}

const mapStateToProps = store => {
    console.log(store); // посмотрим, что же у нас в store?
    return {
        auth: store.user.auth
    }
};
const mapDispatchToProps = dispatch => {
    return {
        logoutAction: () => dispatch(logout()) // [1]
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
