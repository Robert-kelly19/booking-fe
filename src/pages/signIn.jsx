import React from "react";
import ProviderRes from "../components/provider-register";
import Register from "../components/user-register";

export default function SignInPage(){
    return (
        <>
        <div className="reg-page">
            <ProviderRes/>
            <div className="midline"></div>
            <Register/>
        </div>
        </>
    )
}