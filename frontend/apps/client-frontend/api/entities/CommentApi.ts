import {api} from 'components'

export const addCommentApi = (reviewId: number, userId: number, content: string) => {
    return api.post(`/comments/${reviewId}/${userId}`, content, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}

export const getCommentsForReviewApi = (reviewId: number) => {
    return api.get(`/reviews/${reviewId}/comments`)
}
