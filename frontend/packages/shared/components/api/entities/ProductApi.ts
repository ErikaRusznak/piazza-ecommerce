import {api} from "../ApiClient";

export const getProductsApi = (page:number, itemsPerPage:number, sortSpecs:any, filterSpecs:any) => {

    return api.get(`/api/products`, {
        params: {
            page: page,
            itemsPerPage: itemsPerPage,
            sort: JSON.stringify(sortSpecs),
            filter: JSON.stringify(filterSpecs)
        }
    });
}

export const getProductByIdApi = (productId:number) => {
    return api.get(`/api/products/${productId}`)
}
