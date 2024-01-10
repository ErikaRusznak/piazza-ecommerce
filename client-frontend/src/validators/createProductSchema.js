import { number, object, string } from "yup";

export const createProductSchema = object().shape({
    name: string().required("Product name is required"),
    description: string().required("Description is required"),
    price: number()
        .required("Product price is required")
        .typeError("Price must be a number")
        .min(0, "Price can't be less than 0"),
    unitOfMeasure: string().required("Unit of measure is required"),
    categoryId: string().required("Category is required"),
    // image: mixed().required("Image is required").test(
    //     "fileSize",
    //     "File size is too large",
    //     (value) => {
    //         // You can add custom logic here to validate the file size
    //         // Example: return value && value.size <= MAX_FILE_SIZE;
    //         return true;
    //     }
    // ),
});
