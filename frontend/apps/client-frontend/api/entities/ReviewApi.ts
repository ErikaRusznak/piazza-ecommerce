import {api} from 'components';

export const updateReviewApi = (reviewId: number, description: string, rating: number) => {
    return api.put(`/api/reviews/${reviewId}`, {
        description: description,
        rating: rating
    })
}

export const addReviewApi = (productId: number, userId: number, description: string, rating: number) => {
    return api.post(`/api/reviews/${productId}/${userId}`, {
        description: description,
        rating: rating
    })
}