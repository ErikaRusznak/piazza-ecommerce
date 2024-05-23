import {api} from '../ApiClient'

export const getReviewsApi = (productId: number) => {
    return api.get(`/products/${productId}/reviews`)
}

export const getReviewByIdApi = (reviewId: number) => {
    return api.get(`/reviews/${reviewId}`)
}

export const updateReviewApi = (reviewId: number, description: string, rating: number) => {
    return api.put(`reviews/${reviewId}`, {
        description: description,
        rating: rating
    })
}