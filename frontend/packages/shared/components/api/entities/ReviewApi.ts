import {api} from "../ApiClient";

export const getReviewsApi = (productId: number) => {
    return api.get(`/api/products/${productId}/reviews`)
}

export const getReviewByIdApi = (reviewId: number) => {
    return api.get(`/api/reviews/${reviewId}`)
}

