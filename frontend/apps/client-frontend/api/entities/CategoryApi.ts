import { api } from "components";

export const getAllCategoryNames = () => {
    return api.get("/api/categories/categoryNames")
}