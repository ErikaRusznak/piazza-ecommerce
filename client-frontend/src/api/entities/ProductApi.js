import { api } from '../ApiClient'

export const getProductsApi = (page, itemsPerPage, sortSpecs, filterSpecs) => {

    return api.get(`/products`, {
        params: {
            page: page,
            itemsPerPage: itemsPerPage,
            sort: JSON.stringify(sortSpecs),
            filter: JSON.stringify(filterSpecs)
        }
    });
}

export const getProductByIdApi = (productId) => {
    return api.get(`/products/${productId}`)
}

export const createProductApi = (product) => {
    return api.post("/products",
        product
    );
}

export const deleteProductByIdApi = (productId) => {
    return api.delete(`/products/${productId}`)
}

export const updateProductApi = (product) => {
    return api.put("/products",
        product
    );
}