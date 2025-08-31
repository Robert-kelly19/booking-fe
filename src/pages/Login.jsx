import React from "react";
import Providerlogin from "../components/provider-login";
import Login from "../components/user-login";

export default function LoginPage(){
    return (
        <>
        <div className="log-page">
            <Providerlogin/>
            <div className="midline"></div>
            <Login/>
        </div>
        </>
    )
}