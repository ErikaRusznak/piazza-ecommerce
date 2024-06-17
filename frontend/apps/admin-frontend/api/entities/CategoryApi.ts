import { api } from 'components';

export type CategoryCreationType = {
    name: string;
    imageName: string;
};

export type CategoryUpdateType = {
    id: number;
    name: string;
    imageName: string;
}

export const createCategoryApi = (category: CategoryCreationType) => {
    console.log(category)
    return api.post("/api/categories", category);
}

export const deleteCategoryByIdApi = (categoryId: number) => {
    return api.delete(`/api/categories/${categoryId}`);
}

export const updateCategoryApi = (category: CategoryUpdateType) => {
    return api.put("/api/categories", category);
}

export const getCategoryByIdApi = (categoryId: number) => {
    return api.get(`/api/categories/${categoryId}`);
}
