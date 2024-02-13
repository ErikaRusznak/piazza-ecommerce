import React, { Fragment } from "react";
import {Box, Button, styled} from "@mui/material";
import {Save} from "@/components/atoms/icons";

type IProps = {
    children: React.ReactElement | React.ReactElement[];
    handleSubmit?: () => void;
};

const FormBoxContainer = styled("div")(({ theme }) => ({
    backgroundColor: "red",
    color: "purple",
    transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    borderRadius: 10,
    border: `1px solid yellow`,
    backgroundClip: "padding-box",
    boxShadow: "none",
    overflow: "hidden",
}));

const FormButtonContainer = styled("div")(({ theme }) => ({
    minHeight: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "blue",
    padding: "0 16px",
}));

const FormButton = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export const FormBox = ({ children, handleSubmit }: IProps) => {

    return (
        <Fragment>
            <FormBoxContainer>
                <Box component="div" sx={{ padding: 2 }}>
                    {children}
                </Box>

                <FormButtonContainer>
                    <FormButton onClick={handleSubmit}>
                        <Save fontSize="small" sx={{ paddingRight: 1 }} /> Submit
                    </FormButton>
                </FormButtonContainer>

            </FormBoxContainer>
        </Fragment>
    );
};