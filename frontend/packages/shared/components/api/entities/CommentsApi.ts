import {api} from "../ApiClient";

export const addCommentApi = (reviewId: number, userId: number, content: string) => {
    return api.post(`/api/reviews/comments/${reviewId}/${userId}`, content, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}

export const getCommentsForReviewApi = (reviewId: number) => {
    return api.get(`/api/reviews/${reviewId}/comments`)
}
