import React from "react";
import Router from 'next/router';

export default function logout() {
    React.useEffect(() => {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("user", null);
        localStorage.setItem("messages", "{}");
        Router.push("/login");
    });

    return (
        <div />
    )
}