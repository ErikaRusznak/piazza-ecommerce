import {api} from "../ApiClient";

export const reportReviewApi = (reviewId: number, userId: number, reason: string) => {
    return api.post(`/reports/reviews/${reviewId}/${userId}`, reason, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
}

export const reportCommentApi = (commentId: number, userId: number, reason: string) => {
    return api.post(`/reports/comments/${commentId}/${userId}`, reason, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
}