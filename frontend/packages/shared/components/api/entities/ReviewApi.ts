import {api} from "../ApiClient";

export const getReviewsApi = (productId: number) => {
    return api.get(`/products/${productId}/reviews`)
}

export const getReviewByIdApi = (reviewId: number) => {
    return api.get(`/reviews/${reviewId}`)
}

