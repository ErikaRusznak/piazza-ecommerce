import React, {useState} from "react";
import {Button} from "@mui/material";
import useTheme from "@/theme/themes";
import {useRouter} from "next/navigation";
import {useAuth} from "../../../../api/auth/AuthContext";

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
        </>
    );
};

export default AccountManagement;