import { api } from 'components';

export const getSellerRequestsApi = (page:number, itemsPerPage:number) => {
    return api.get(`/api/seller-requests`, {
        params: {
            page: page,
            itemsPerPage: itemsPerPage,
        }
    });
}

export const approveSellerRequestsApi = (requestId: number) => {
    return api.put(`/api/seller-requests/${requestId}/approve`);
}

export const rejectSellerRequestApi = (requestId: number) => {
    return api.put(`/api/seller-requests/${requestId}/reject`);
}

