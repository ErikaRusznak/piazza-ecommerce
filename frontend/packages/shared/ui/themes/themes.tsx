"use client";

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
import {createTheme, TypeBackground} from '@mui/material/styles';
import {PaletteMode} from "@mui/material";


declare module "@mui/material/styles" {
    interface TypeBackground {
        gradient: string;
        darker: string;
        lighter: string;
    }

}

declare module "@mui/material/styles/createPalette" {
    interface Palette {
        mode: PaletteMode;
        tertiary: {
            main: string;
            contrastText: string;
        };
        lightColor: {
            main: string;
            contrastText: string;
        }
    }

    interface PaletteOptions {
        tertiary?: {
            main?: string;
            contrastText?: string;
        };
        lightColor?: {
            main?: string;
            contrastText?: string;
        }
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

const baseTheme = {
    typography: {
        fontFamily: [`Open Sans`, `sans-serif`, `Roboto`].join(","),
        fontWeightLight: 300,
        fontWeightMedium: 500,
        fontWeightBold: 700,
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
            fontSize: "1.01rem",
        },
        subtitle1: {
            fontSize: "1.25rem",
            fontWeight: 400,
            lineHeight: 1.35,
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
};

const lightPalette = {
    mode: "light" as PaletteMode,
    background: {
        paper: "#fff",
        lighter: "#1a2747",
        default: "white",
        darker: "white",
        gradient:
            "linear-gradient(267.27deg, #6366f1 0%, #4338ca 100%)",
    },

    tertiary: {
        main: "#4338ca",
        contrastText: "white"
    },
    secondary: {
        main: "#4f46e5",
        contrastText: "white",
    },
    primary: {
        main: "#6366f1",
        contrastText: "white",
    },
    lightColor: {
        main: "#a5b4fc",
        contrastText: "#020617",
    },
    info: {
        main: "#020617",
        contrastText: "#fff",
    },
}


const darkPalette = {
    background: {
        paper: "#fff",
        lighter: "#1a2747",
        default: "#0F172A",
        darker: "#020617",
        gradient:
            "linear-gradient(267.27deg, #6366f1 0%, #4338ca 100%)",
    },

    tertiary: {
        main: "#4338ca",
        contrastText: "white"
    },
    secondary: {
        main: "#4f46e5",
        contrastText: "white",
    },
    primary: {
        main: "#6366f1",
        contrastText: "white",
    },
    lightColor: {
        main: "#a5b4fc",
        contrastText: "#020617",
    },
    info: {
        main: "#fff",
        contrastText: "#020617",
    },
}

const lightTheme = createTheme({
    ...baseTheme,
    palette: lightPalette
});

const darkTheme = createTheme({
    ...baseTheme,
    palette: darkPalette
});

export { baseTheme, lightTheme, darkTheme };