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
        accent: string;
        main: string;
        canvas: string;
    }
}

const useTheme = () => createTheme({
        palette: {
            background: {
                canvas: "#fff",
                paper: "#173247",
                default: "#173247",
                main: "#061D2E",
                accent:
                    "linear-gradient(180deg, #061D2E 0%, rgba(6, 29, 46, 0.91) 42.00%, #061D2E 100%);",
            },
            secondary: {
                main: "#6673EA",
                contrastText: "white",
            },
            primary: {
                main: "#2DD2DD",
                contrastText: "white",
            },
            info: {
                main: "#fff",
            },
        },

        typography: {
            fontFamily: [`Open Sans`, `sans-serif`, `Roboto`].join(","),
            h1: {
                fontSize: "5rem",
                fontWeight:
                    800,
            },
            h2: {
                fontSize: "3.02rem", // 46px
                fontWeight:
                    300,
            },
            h3: {
                fontSize: "2.6rem", // 40px
                fontWeight:
                    800,
            },
            h4: {
                fontSize: "1.9rem",
                fontWeight:
                    800,
            },
            h5: {
                fontSize: "1.78rem",
                fontWeight:
                    800,
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
    }
);

export default useTheme;
