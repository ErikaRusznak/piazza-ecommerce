import { api } from 'components';

export const createCategoryApi = (category: any) => {
    return api.post("/api/categories", category);
}

export const deleteCategoryByIdApi = (categoryId: number) => {
    return api.delete(`/api/categories/${categoryId}`);
}

export const updateCategoryApi = (category: any) => {
    return api.put("/api/categories", category);
}

export const getCategoryByIdApi = (categoryId: number) => {
    return api.get(`/api/categories/${categoryId}`);
}
