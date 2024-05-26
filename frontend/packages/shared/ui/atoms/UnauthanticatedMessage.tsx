import * as React from "react";
// import useTheme from "@/theme/themes";
import {useRouter} from "next/navigation";
import Typography from "@mui/material/Typography";
import StyledButton from "./StyledButton";
import useTheme from "admin-frontend/src/theme/themes";

const UnauthenticatedMessage = () => {

    const theme = useTheme();
    const router = useRouter();

    return (
        <>
            <Typography color={theme.palette.info.main} sx={{mb: 2}}>
                You need to be authenticated! Click here:
            </Typography>
            <StyledButton variant="contained" onClick={() => router.push("/login")}>
                Log in
            </StyledButton>
        </>
    );
};

export default UnauthenticatedMessage;