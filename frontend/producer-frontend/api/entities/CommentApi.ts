import {api} from '../ApiClient'

export const addCommentApi = (reviewId: number, userId: number, content: string) => {
    return api.post(`/comments/${reviewId}/${userId}`, {
        content: content
    })
}