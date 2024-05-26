import { styled } from "@mui/material";
import Link from "next/link";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "../../../contexts/ThemeContext";

type StyledLinkProps = {
    color?: "info" | "primary" | "secondary";
};

const StyledLink = styled(Link)<StyledLinkProps>(
    ({ color = "info" }) => {
        const theme = useTheme();
        const {isDark} = useThemeToggle();
        return {
            color: (() => {
                switch (color) {
                    case "info":
                        return isDark ? theme.palette.info.contrastText : theme.palette.info.main;
                    case "primary":
                        return theme.palette.primary.main;
                    case "secondary":
                        return theme.palette.secondary.light;
                    default:
                        return theme.palette.info.main;
                }
            })(),
            transition: 'color 0.3s',
            '&:hover': {
                color: (() => {
                    // Change color on hover
                    switch (color) {
                        case "info":
                            return theme.palette.primary.main; // Change to a darker shade on hover
                        case "primary":
                            return theme.palette.primary.dark;
                        case "secondary":
                            return theme.palette.secondary.main; // Change to the main color on hover
                        default:
                            return theme.palette.info.dark;
                    }
                })(),
            },
            fontFamily: theme.typography.fontFamily,
        };
    }
);

export default StyledLink;