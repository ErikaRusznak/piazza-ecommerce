import { Button, ButtonProps, styled } from "@mui/material";

const StyledButton = styled(Button, {
    shouldForwardProp: (props) => true,
})<ButtonProps>(({ theme }) => ({
    "&.MuiButton-containedPrimary": {
        background: "linear-gradient(267.27deg, #2e7474 0%, #183D3D 100%)",
        // textTransform: "initial",
        transition: "background 1s ease, color 0.3;;;;;;;s ease",
        color: theme.palette.primary.contrastText,
    },
    "&:hover": {
        background: "linear-gradient(267.27deg, #183D3D 10%, #2e7474 90%)",
    }
}));

export default StyledButton;