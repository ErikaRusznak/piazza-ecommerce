import React, {useState} from "react";
import {Button, Paper, Typography} from "@mui/material";
import useTheme from "@/theme/themes";
import {deleteAccountByIdApi} from "../../../../api/entities/UserAccount";
import {useRouter} from "next/navigation";
import DeleteAccountModal from "@/components/organisms/modals/DeleteAccountModal";

type AccountManagementProps = {
    user: any;
}

const AccountManagement = ({user}:AccountManagementProps) => {

    const theme = useTheme();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDelete = () => {
        deleteAccountByIdApi(user.id)
            .then(res => {
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