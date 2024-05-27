"use client";

import {useState} from "react";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {useAuth} from "components";
import {AxiosResponse} from "axios";
import {DeleteAccountModal} from "ui";

type AccountManagementProps = {
    user: any;
    deleteAccountApi: (accountId: number) => Promise<AxiosResponse<any, any>>
}

const AccountManagement = ({user, deleteAccountApi}:AccountManagementProps) => {

    const router = useRouter();
    const {logout} = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDelete = () => {
        deleteAccountApi(user.id)
            .then(res => {
                logout();
                router.push("/login");
            })
            .catch(err => console.log(err))
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