import { api } from "components";

export const getAllCategoryNames = () => {
    return api.get("/categories/categoryNames")
}