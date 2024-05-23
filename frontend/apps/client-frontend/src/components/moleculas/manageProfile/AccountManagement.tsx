import React, {useState} from "react";
import {Button} from "@mui/material";
import useTheme from "@/theme/themes";
import {deleteAccountForBuyerByIdApi} from "../../../../api/entities/UserAccount";
import {useRouter} from "next/navigation";
import DeleteAccountModal from "@/components/organisms/modals/DeleteAccountModal";
import {useAuth} from "../../../../api/auth/AuthContext";

type AccountManagementProps = {
    user: any;
}

const AccountManagement = ({user}:AccountManagementProps) => {

    const theme = useTheme();
    const router = useRouter();
    const {logout} = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDelete = () => {
        deleteAccountForBuyerByIdApi(user.id)
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