import { Button, ButtonProps, styled } from "@mui/material";

const StyledButton = styled(Button, {
    shouldForwardProp: (props) => true,
})<ButtonProps>(({ theme }) => ({
    "&.MuiButton-containedPrimary": {
        background: "linear-gradient(267.27deg, #5879EF 0%, #4338ca 100%)",
        // textTransform: "initial",
        transition: "background 1s ease, color 0.3s ease",
        color: theme.palette.primary.contrastText,
    },
    "&:hover": {
        background: "linear-gradient(267.27deg, #4338ca 10%, #5879EF 90%)",
    }
}));

export default StyledButton;