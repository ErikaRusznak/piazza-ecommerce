import { api } from 'components'

export const createProductApi = (product:any) => {
    return api.post("/products",
        product
    );
}

export const deleteProductByIdApi = (productId:number) => {
    return api.delete(`/products/${productId}`)
}

export const updateProductApi = (product:any) => {
    return api.put("/products",
        product
    );
}

export const addProductsInStoreApi = (productId: number, quantity: number) => {
    return api.put(`/products/${productId}`, quantity, { headers: { 'Content-Type': 'application/json' } });
}

