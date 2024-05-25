import { api } from 'components';

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
