import { api } from 'components';

export const getCommentByIdApi = (commentId: number) => {
    return api.get(`/api/reviews/comments/${commentId}`);
}