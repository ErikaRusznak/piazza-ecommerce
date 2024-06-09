import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import {BaseModal} from "ui";
import {Box, Typography} from "@mui/material";
import {addProductsInStoreApi} from "../../../../api/entities/ProductApi";
import {QuantityInput} from "ui";
import {StyledButton, useThemeToggle} from "ui";
import {useAlert} from "components";

type DeleteModalProps = {
    isModalOpen: boolean;
    toggleModal: (id: number|null) => void;
    setIsModalOpen: (value: boolean) => void;
    productId: number;
    updateProductData: (newProductData: any) => void;
}
const AddProductsInStoreModal = (
    {
        isModalOpen,
        toggleModal,
        setIsModalOpen,
        productId,
        updateProductData
    }: DeleteModalProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const [quantity, setQuantity] = useState<number>(1);
    const {pushAlert} = useAlert();
    const handleAddProductsInStore = (quantity: number) => {
        addProductsInStoreApi(productId, quantity)
            .then(res => {
                updateProductData(res.data);
                setIsModalOpen(false);
                pushAlert({
                    type: "success",
                    title: "Add products",
                    paragraph: "More products were added into the store!"
                });
            })
            .catch(err => console.error(err))
    };

    const changeQuantity = (num:number) => {
        setQuantity(quantity + num);
    }

    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(productId)}>
            {productId && (
                <Box sx={{
                    color: theme.palette.info.main,
                    backgroundColor: isDark ? theme.palette.background.lighter : theme.palette.background.default,
                    px: 5, py: 3,
                    borderRadius: "14px",
                    border: "1px solid #a5b4fc",
                    textAlign: "center"
                }}>
                    <Typography>Add more products in the store</Typography>
                    <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                        <QuantityInput quantity={quantity} onQuantityChanged={changeQuantity}/>
                        <StyledButton variant="contained" sx={{height: "3rem", alignSelf: "center"}}
                                      onClick={() => handleAddProductsInStore(quantity)}>
                            Add
                        </StyledButton>
                    </Box>
                </Box>
            )}

        </BaseModal>
    );
};

export default AddProductsInStoreModal;