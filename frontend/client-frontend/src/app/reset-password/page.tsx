"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {resetPasswordApi} from "../../../api/entities/UserAccount";
import MainLayout from "@/components/templates/MainLayout";

type ResetPasswordPageProps = {
    searchParams: {
        token: string;
    }
}

const ResetPasswordPage = ({searchParams}:ResetPasswordPageProps) => {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string|null>("");
    const [success, setSuccess] = useState(false);

    const token  = decodeURIComponent(searchParams.token);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        resetPasswordApi(token, newPassword)
            .then((res) => {
                setSuccess(true);
            })
            .catch((err) => {
                setError("Failed to reset password.")
            })
    };

    if (success) {
        return <p>Password reset successfully!</p>;
    }

    return (
        <MainLayout>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label style={{color: "white"}}>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <label style={{color: "white"}}>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </MainLayout>
    );
};

export default ResetPasswordPage;