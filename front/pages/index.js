import React, { Component } from "react";
import Router from "next/router";

const checkIfLogged = _ => {
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  let user = JSON.parse(localStorage.getItem("user"));
  return loggedIn
}

export default class Index extends Component {
  componentDidMount = () => {
    // let { pathname } = window.location
    let auth = checkIfLogged();
    if ( !auth ) {
      Router.push("/login");
    } else {
      Router.push("/components")
    }    
  };

  render() {
    return <div />;
  }
}
