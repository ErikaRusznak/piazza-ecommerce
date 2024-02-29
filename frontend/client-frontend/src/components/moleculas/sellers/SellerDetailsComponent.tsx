import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';

type SellerDetailsComponentProps = {
    seller: any;
    username: string;
}
const SellerDetailsComponent = ({ seller, username }:SellerDetailsComponentProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <div>
                    <Typography variant="h4" gutterBottom>
                        {seller.alias}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {seller.sellerType}
                    </Typography>
                </div>
            </Grid>

            <Grid item xs={12} sm={6} md={8}>
                <div>
                    <Typography variant="h6" gutterBottom>
                        Contact details
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Address Line 1:</span> {seller.addressLine1}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Address Line 2:</span> {seller.addressLine2}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>City:</span> {seller.city}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>State:</span> {seller.state}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Country:</span> {seller.country}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Zipcode:</span> {seller.zipCode}
                    </Typography>
                    <Divider style={{ margin: '16px 0' }} />

                    <Typography variant="h6" gutterBottom>
                        Account details
                    </Typography>
                    {username === seller.account.email && (
                        <>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>First name:</span> {seller.account.firstName}
                            </Typography>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Last name:</span> {seller.account.lastName}
                            </Typography>
                        </>
                    )}
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Email:</span> {seller.account.email}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Telephone:</span> {seller.account.telephone}
                    </Typography>

                    {(seller.sellerType === 'COMPANY' || seller.sellerType === 'PFA') && (
                        <>
                            <Divider style={{ margin: '16px 0' }} />
                            <Typography variant="h6" gutterBottom>
                                Legal details
                            </Typography>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Company Type:</span> {seller.sellerType}
                            </Typography>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Company Name:</span> {seller.companyName}
                            </Typography>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>CUI:</span> {seller.cui}
                            </Typography>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Date of registration:</span>{' '}
                                {seller.dateOfRegistration}
                            </Typography>
                        </>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

export default SellerDetailsComponent;
