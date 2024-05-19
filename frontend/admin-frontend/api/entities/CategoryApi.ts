import { api } from '../ApiClient'

export const getAllCategoriesApi = () => {
    return api.get("/categories")
}

export const createCategoryApi = (category: any) => {
    return api.post("/categories", category);
}

export const deleteCategoryByIdApi = (categoryId: number) => {
    return api.delete(`/categories/${categoryId}`);
}

export const updateCategoryApi = (category: any) => {
    return api.put("/categories", category);
}

export const getCategoryByIdApi = (categoryId: number) => {
    return api.get(`/categories/${categoryId}`);
}
