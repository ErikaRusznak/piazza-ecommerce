"use client";

import React,  from "react";
import {forgotPasswordApi} from "../../../api/entities/UserAccount";
import MainLayout from "@/components/templates/MainLayout";


const Page = () => {

    const [email, setEmail] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const handleForgotPassword = async () => {
        console.log("here");
        forgotPasswordApi(email)
            .then((res) => {
                console.log("bier")
                setSuccessMessage(res.data);
                setErrorMessage("");
            })
            .catch((err) => {
                setErrorMessage(err.response.data);
                setSuccessMessage("");
            })
    };

    return (
        <MainLayout>
            {errorMessage && <p>{errorMessage}</p>}

                <label style={{color: "white"}}>Please enter your email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button onClick={handleForgotPassword} >Search email</button>

        </MainLayout>
    );
};

export default Page;
