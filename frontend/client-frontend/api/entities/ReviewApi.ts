import {api} from '../ApiClient'

export const getReviewsApi = (productId: number) => {
    return api.get(`/products/${productId}/reviews`)
}

export const getReviewByIdApi = (reviewId: number) => {
    return api.get(`/reviews/${reviewId}`)
}

export const updateReviewApi = (reviewId: number, description: string, rating: number) => {
    return api.put(`/reviews/${reviewId}`, {
        description: description,
        rating: rating
    })
}

export const addReviewApi = (productId: number, userId: number, description: string, rating: number) => {
    return api.post(`/reviews/${productId}/${userId}`, {
        description: description,
        rating: rating
    })
}