import React, {useState} from "react";
import {Button} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {useRouter} from "next/navigation";

type AccountManagementProps = {
    user: any;
}

const AccountManagement = ({user}:AccountManagementProps) => {

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