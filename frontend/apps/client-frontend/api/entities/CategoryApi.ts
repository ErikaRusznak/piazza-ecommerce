import { api } from "components";

export const getAllCategoriesApi = () => {
    return api.get("/categories")
}

export const getAllCategoryNames = () => {
    return api.get("/categories/categoryNames")
}