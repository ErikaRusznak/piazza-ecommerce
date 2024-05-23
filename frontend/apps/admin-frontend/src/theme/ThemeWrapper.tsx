// import {
//     createTheme,
//     CssBaseline,
//     PaletteMode,
//     responsiveFontSizes,
//     Theme,
//     ThemeProvider,
// } from "@mui/material";
// import React, { useMemo } from "react";
//
// export type ThemeWrapperProps = {
//     children?: React.ReactNode;
//     withTheme?: (theme: Theme) => React.ReactNode;
//     mode?: PaletteMode;
// };
//
// const ThemeWrapper = ({
//                           children,
//                           withTheme,
//                           mode = "dark",
//                       }: ThemeWrapperProps) => {
//     const activeTheme = useMemo(() => {
//         const themeOptions = getThemeOptions(mode);
//         const generatedTheme = createTheme(themeOptions);
//         const responsiveTheme = responsiveFontSizes(generatedTheme);
//         return responsiveTheme;
//     }, [mode]);
//
//     return (
//         <ThemeProvider theme={activeTheme}>
//             <CssBaseline />
//             {withTheme && withTheme(activeTheme)}
//             {children}
//         </ThemeProvider>
//     );
// };
//
// export default ThemeWrapper;