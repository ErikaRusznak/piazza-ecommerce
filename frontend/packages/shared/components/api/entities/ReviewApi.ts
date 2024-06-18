import {api} from "../ApiClient";

export const getReviewsApi = (productId: number) => {
    return api.get(`/api/products/${productId}/reviews`)
}

export const getReviewByIdApi = (reviewId: number) => {
    return api.get(`/api/reviews/${reviewId}`)
}

export const updateReviewApi = (reviewId: number, description: string, rating: number) => {
    return api.put(`/api/reviews/${reviewId}`, {
        description: description,
        rating: rating
    })
}


