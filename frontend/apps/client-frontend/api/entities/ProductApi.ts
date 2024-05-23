import { api } from '../ApiClient'

export const getProductsApi = (page:number, itemsPerPage:number, sortSpecs:any, filterSpecs:any) => {

    return api.get(`/products`, {
        params: {
            page: page,
            itemsPerPage: itemsPerPage,
            sort: JSON.stringify(sortSpecs),
            filter: JSON.stringify(filterSpecs)
        }
    });
}

export const getProductByIdApi = (productId:number) => {
    return api.get(`/products/${productId}`)
}

export const createProductApi = (product:any) => {
    return api.post("/products",
        product
    );
}

export const deleteProductByIdApi = (productId:string) => {
    return api.delete(`/products/${productId}`)
}

export const updateProductApi = (product:any) => {
    return api.put("/products",
        product
    );
}