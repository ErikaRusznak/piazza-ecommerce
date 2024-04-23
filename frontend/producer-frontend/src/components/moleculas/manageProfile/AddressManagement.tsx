import React, {useEffect, useState} from "react";
import {
    Box, Grid,
    Typography,
} from "@mui/material";
import useTheme from "@/theme/themes";
import {useAuth} from "../../../../api/auth/AuthContext";
import {getSellerByEmailApi} from "../../../../api/entities/SellerApi";
import LegalDetailsForm from "@/components/moleculas/accountDetails/LegalDetailsForm";
import AddressDetailsForm from "@/components/moleculas/accountDetails/AddressDetailsForm";
type AddressManagementProps = {
    user: any;
    setUser: (data: any) => void;
};

const AddressManagement = ({ user, setUser}: AddressManagementProps) => {
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

    console.log("seller", seller)

    useEffect(() => {
        getSellerByEmail(username);
    }, [username]);


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

            <Grid item xs={12} md={seller?.sellerType !== "LOCAL_FARMER" ? 6: 12}>
                <AddressDetailsForm
                    setUser={setUser}
                    id={seller?.id}
                    addressLine1={seller?.addressLine1}
                    addressLine2={seller?.addressLine2}
                    city={seller?.city}
                    country={seller?.country}
                    state={seller?.state}
                    zipCode={seller?.zipCode}
                />
            </Grid>
        </Grid>
    );
};

export default AddressManagement;
