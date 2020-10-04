import React, {Component, useEffect} from "react";
import {connect} from "react-redux";


function HelloPage(props) {
    return (
        <div>Hello {props.name}</div>
    );
}
const mapStateToProps = store => {
    console.log(store); // посмотрим, что же у нас в store?
    return {
        name: store.user.name
    }
};
export default connect(mapStateToProps)(HelloPage);
