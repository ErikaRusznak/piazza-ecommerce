import { api } from '../ApiClient'

export const getAllCategoriesApi = () => {
    return api.get("/categories")
}

export const getAllCategoriesByItemsPerPageAndPage = (page: number, itemsPerPage:number) => {
    return api.get("/categories", {params: { page: page, itemsPerPage: itemsPerPage }})
}

export const getAllCategoryNames = () => {
    return api.get("/categories/categoryNames")
}