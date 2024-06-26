import React from "react";
import { Link, Container, Typography, Box } from "@mui/material";
import {ArrowForwardIcon} from "@/components/atoms/icons";
import {useTheme} from "@mui/material/styles";

type ErrorComponentProps = {
    description: string;
    solution: string;
    linkTo: string;
};

const ErrorComponent = ({ description, solution, linkTo }: ErrorComponentProps) => {
    const theme = useTheme();
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "lg",
                p: 6,
                bg: "background.paper",
                borderRadius: "2xl",
                boxShadow: "lg",
            }}
        >
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Box>
                    <Typography variant="h4" align="center" sx={{mb: 2, fontWeight: "bold", color: theme.palette.info.main}}>
                        Oops!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 6, mb: 3, color: theme.palette.info.main }}>
                        {description}
                    </Typography>
                </Box>

                <Link href={linkTo} underline="hover" sx={{ alignSelf: "flex-end", color: "primary.main", display: "flex", alignItems: "center" }}>
                    <Typography sx={{color: theme.palette.info.main, mr: 2}}>{solution}</Typography>
                    <ArrowForwardIcon />
                </Link>
            </Box>
        </Container>
    );
};

export default ErrorComponent;
