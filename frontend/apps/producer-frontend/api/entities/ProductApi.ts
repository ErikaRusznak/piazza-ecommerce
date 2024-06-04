import { api } from 'components'

export const createProductApi = (product:any) => {
    return api.post("/api/products",
        product
    );
}

export const deleteProductByIdApi = (productId:number) => {
    return api.delete(`/api/products/${productId}`)
}

export const updateProductApi = (product:any) => {
    return api.put("/api/products",
        product
    );
}

export const addProductsInStoreApi = (productId: number, quantity: number) => {
    return api.put(`/api/products/${productId}`, quantity, { headers: { 'Content-Type': 'application/json' } });
}

