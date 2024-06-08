"use client";

import {useState} from "react";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {useAlert, useAuth} from "components";
import {AxiosResponse} from "axios";
import {DeleteAccountModal} from "ui";

type AccountManagementProps = {
    user: any;
    deleteAccountApi: (accountId: number) => Promise<AxiosResponse<any, any>>
}

const AccountManagement = ({user, deleteAccountApi}:AccountManagementProps) => {

    const router = useRouter();
    const {logout} = useAuth();
    const {pushAlert} = useAlert();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDelete = () => {
        deleteAccountApi(user.id)
            .then(res => {
                logout();
                pushAlert({
                    type: "success",
                    title: "Account deletion",
                    paragraph: "Account was deleted successfully!"
                });
                router.push("/login");
            })
            .catch(err => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Profile information",
                    paragraph: "Could not delete account."
                });
            })
    };

    return (
        <>
            <Button
                variant="contained"
                color="error"
                sx={{mt: 2}}
                onClick={toggleModal}
            >
                Delete Account
            </Button>

            <DeleteAccountModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                setIsModalOpen={setIsModalOpen}
                onDelete={handleDelete}
                userId={user.id} />
        </>
    );
};

export default AccountManagement;