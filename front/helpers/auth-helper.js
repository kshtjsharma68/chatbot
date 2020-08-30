import React from "react";

export default {
    loggedIn: JSON.parse(localStorage.getItem("loggedIn")),
    loggedInUser: JSON.parse(localStorage.getItem("user")),
    checkAuthentication: function() {
        return this.loggedIn
    },
};