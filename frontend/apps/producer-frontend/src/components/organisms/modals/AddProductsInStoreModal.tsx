import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import BaseModal from "@/components/templates/BaseModal";
import {Box, Typography} from "@mui/material";
import {addProductsInStoreApi} from "../../../../api/entities/ProductApi";
import QuantityInput from "@/components/atoms/QuantityInput";
import StyledButton from "@/components/atoms/StyledButton";

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
    const [quantity, setQuantity] = useState<number>(1);
    const handleAddProductsInStore = (quantity: number) => {
        addProductsInStoreApi(productId, quantity)
            .then(res => {
                updateProductData(res.data);
                setIsModalOpen(false);
            })
            .catch(err => console.log(err))

    };

    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(productId)}>
            {productId && (
                <Box sx={{
                    color: theme.palette.info.main,
                    backgroundColor: theme.palette.background.lighter,
                    px: 5, py: 3,
                    borderRadius: "14px",
                    border: "1px solid #a5b4fc",
                    textAlign: "center"
                }}>
                    <Typography>Add more products in the store</Typography>
                    <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                        <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
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