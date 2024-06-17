"use client";

import {Box, Button, Container, Typography} from "@mui/material";
import {useRouter} from "next/navigation";

const NotFoundCustomPage = () => {

    const router = useRouter();
    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                textAlign: 'center',
            }}
        >
            <Box>
                <Typography variant="h1" component="div" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleGoHome} sx={{mt: 2}}>
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundCustomPage;