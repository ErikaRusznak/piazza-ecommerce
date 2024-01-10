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

export function createProductApi(product){
    return api.post('/products',
        product
    );
}