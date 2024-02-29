import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/300-italic.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/500-italic.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/700-italic.css";
import "@fontsource/open-sans/800-italic.css";
import {createTheme} from '@mui/material/styles';

declare module "@mui/material/styles" {
    interface TypeBackground {
        gradient: string;
        darker: string;
        lighter: string;
    }
}

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxs: true;
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
    }
}

const useTheme = () => createTheme({
        palette: {
            background: {
                paper: "#fff",
                lighter: "#2e7474",
                default: "#183D3D",
                darker: "#143232",
                gradient:
                    "linear-gradient(267.27deg, #2e7474 0%, #183D3D 100%)",
            },
            secondary: {
                main: "#5C8374",
                contrastText: "white",
            },
            primary: {
                main: "#93B1A6",
                contrastText: "white",
            },
            info: {
                main: "#fff",
                contrastText: "#143232",
            },
        },

        typography: {
            fontFamily: [`Open Sans`, `sans-serif`, `Roboto`].join(","),
            h1: {
                fontSize: "5rem",
            },
            h2: {
                fontSize: "3.02rem",
            },
            h3: {
                fontSize: "2.6rem",
            },
            h4: {
                fontSize: "1.9rem",

            },
            h5: {
                fontSize: "1.78rem",
            },
            h6: {
                fontWeight: 600,
            },
            body1: {
                fontWeight: 300,
            },
            body2: {
                fontWeight: 300,
                fontSize:
                    "1.01rem",
            },
            subtitle1: {
                fontSize: "1.25rem",
                fontWeight:
                    400,
                lineHeight:
                    1.35,
            },
        },
        breakpoints: {
            values: {
                xxs: 0,
                xs: 352,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    }
);

export default useTheme;
