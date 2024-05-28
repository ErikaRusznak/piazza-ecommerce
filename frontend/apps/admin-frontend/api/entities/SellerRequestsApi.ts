import { api } from 'components';

export const getSellerRequestsApi = (page:number, itemsPerPage:number) => {
    return api.get(`/seller-request`, {
        params: {
            page: page,
            itemsPerPage: itemsPerPage,
        }
    });
}

export const approveSellerRequestsApi = (requestId: number) => {
    return api.put(`/seller-request/${requestId}/approve`);
}

export const rejectSellerRequestApi = (requestId: number) => {
    return api.put(`/seller-request/${requestId}/reject`);
}

