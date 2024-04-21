import React, { useState } from "react";
import {
    Button,
    Grid,
    IconButton,
    ListItemSecondaryAction,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Edit } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import useTheme from "@/theme/themes";

type AddressManagementProps = {
    addresses: any[];
};

const AddressManagement = ({ addresses }: AddressManagementProps) => {
    const theme = useTheme();
    const [newAddress, setNewAddress] = useState({
        country: "",
        state: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        zipCode: "",
    });

    const handleEditAddress = (address: any) => {
        // Implement edit address functionality
    };

    const handleDeleteAddress = (address: any) => {
        // Implement delete address functionality
    };

    const handleAddAddress = () => {
        // Implement add address functionality
    };

    return (
        <Paper elevation={3} style={{ padding: theme.spacing(2), marginTop: 20 }}>
            <Typography variant="h4">Address Management</Typography>
            {Array.isArray(addresses) && addresses.length > 0 ? (
                <List>
                    {addresses.map((address: any) => (
                        <ListItem key={address.id}>
                            <ListItemText
                                primary={`${address.addressLine1}, ${address.city}, ${address.state}, ${address.country}, ${address.zipCode}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handleEditAddress(address)}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDeleteAddress(address)}
                                >
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">No addresses found.</Typography>
            )}
            <Typography variant="h5">Add new address</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Country"
                        value={newAddress.country}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, country: e.target.value })
                        }
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddAddress}
                    >
                        Add Address
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AddressManagement;
