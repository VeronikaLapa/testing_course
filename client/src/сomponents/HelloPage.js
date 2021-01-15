import React, {Component, useEffect} from "react";
import {connect} from "react-redux";


function HelloPage(props) {
    return (
        <div>
            {props.auth && (<h1>Hello {props.name}</h1>)}
            {!props.auth && (<h1>You are not authorized</h1>)}
        </div>
    );
}
const mapStateToProps = store => {
    console.log(store); // посмотрим, что же у нас в store?
    return {
        name: store.user.user.name,
        auth: store.user.auth
    }
};
export default connect(mapStateToProps)(HelloPage);
