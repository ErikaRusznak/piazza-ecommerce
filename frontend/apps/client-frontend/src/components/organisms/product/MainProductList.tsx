import React from "react";
import {List, ListItem} from "@mui/material";
import ProductCard from "@/components/moleculas/ProductCard";
import {useTheme} from "@mui/material/styles";

type MainProductListProps = {
    products: any;
    toggleModal: (productId: number) => void;
    border?: boolean;
}

const MainProductList = ({products, toggleModal}:MainProductListProps) => {

    const theme = useTheme();

    return (
        <List
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                maxWidth: "872px",
                margin: "0 auto",
                [theme.breakpoints.only("lg")]: {
                    maxWidth: "872px"
                },
                [theme.breakpoints.only("md")]: {
                    maxWidth: "872px"
                },
                [theme.breakpoints.only("sm")]: {
                    maxWidth: "567px",
                },
                [theme.breakpoints.only("xs")]: {
                    maxWidth: "320px",
                },
                [theme.breakpoints.only("xxs")]: {
                    maxWidth: "148px",
                },
                flexWrap: "wrap",
                columnGap: theme.spacing(3),
                rowGap: theme.spacing(3),
            }}
        >
            {products.map((product:any) => (
                <ListItem
                    key={product.id}
                    sx={{
                        display: "block",
                        paddingBlockEnd: "0px",
                        paddingBlockStart: "0px",
                        paddingInlineEnd: "0px",
                        paddingInlineStart: "0px",
                        maxWidth: "200px",
                        [theme.breakpoints.only("sm")]: {
                            maxWidth: "173px",
                        },
                        [theme.breakpoints.only("xs")]: {
                            maxWidth: "148px",
                        },
                        [theme.breakpoints.only("xxs")]: {
                            maxWidth: "148px",
                        },
                    }}
                >
                    <ProductCard
                        product={product}
                        toggleModal={() => toggleModal(product.id)}
                    />

                </ListItem>
            ))}
        </List>
    );
};

export default MainProductList;