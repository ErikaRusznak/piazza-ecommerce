import React, {useEffect, useState} from "react";
import {
    Box, Grid,
    Typography,
} from "@mui/material";
import useTheme from "@/theme/themes";
import {useAuth} from "../../../../api/auth/AuthContext";
import {getSellerByEmailApi} from "../../../../api/entities/SellerApi";
import LegalDetailsForm from "@/components/moleculas/accountDetails/LegalDetailsForm";
type AddressManagementProps = {

};

const AddressManagement = ({ }: AddressManagementProps) => {
    const theme = useTheme();
    const {username} = useAuth();
    const [seller, setSeller] = useState<any>();

    const getSellerByEmail = (username: string) => {
        if(username) {
            getSellerByEmailApi(username)
                .then((res) => {
                    setSeller(res.data)
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    useEffect(() => {
        getSellerByEmail(username);
    }, [username]);



    const [legalAddress, setLegalAddress] = useState({
        country: '',
        state: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        zipCode: ''
    });


    // const handleSubmitLegalAddress = (e) => {
    //     e.preventDefault();
    //     // Call the API function to update seller legal address
    //     updateSellerAddressApi(sellerId, legalAddress)
    //         .then(response => {
    //             console.log('Legal address updated successfully:', response.data);
    //             // Optionally handle success, e.g., show a success message
    //         })
    //         .catch(error => {
    //             console.error('Error updating legal address:', error);
    //             // Optionally handle error, e.g., show an error message
    //         });
    // };

    console.log("s", seller)

    return (username && seller) && (
        <Grid container spacing={2} sx={{mt: 2}} justifyContent="center">
            {seller?.sellerType !== "LOCAL_FARMER" && (
                <Grid item xs={12} md={6}>
                    <LegalDetailsForm
                        name={seller?.companyName}
                        cui={seller?.cui}
                        companyType={seller?.companyType}
                        numericCodeByState={seller?.numericCodeByState}
                        serialNumber={seller?.serialNumber}
                        dateOfRegistration={seller?.dateOfRegistration}
                    />
                </Grid>
            )}

            {/*<Grid item xs={12} md={seller?.sellerType !== "LOCAL_FARMER" ? 6: 12}>*/}
                {/*<Box sx={{ p: 2, border: '1px solid #a5b4fc', borderRadius: '14px' }}>*/}
                {/*    <Typography variant="h5" sx={{ mb: 2 }}>Legal Address</Typography>*/}
                {/*    <form onSubmit={handleSubmitLegalAddress}>*/}
                {/*        /!* Input fields for legal address *!/*/}
                {/*        <TextField*/}
                {/*            label="Country"*/}
                {/*            variant="outlined"*/}
                {/*            fullWidth*/}
                {/*            margin="normal"*/}
                {/*            name="country"*/}
                {/*            value={legalAddress.country}*/}
                {/*            onChange={handleChangeLegalAddress}*/}
                {/*        />*/}
                {/*        /!* Add more TextField components for other legal address fields *!/*/}
                {/*        <Button type="submit" variant="contained" color="primary">Update Legal Address</Button>*/}
                {/*    </form>*/}
                {/*</Box>*/}
            {/*</Grid>*/}
        </Grid>
    );
};

export default AddressManagement;
