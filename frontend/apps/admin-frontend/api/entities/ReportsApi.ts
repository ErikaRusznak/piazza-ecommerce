import { api } from 'components';

export const getAllCommentsThatHaveReportsApi = () => {
    return api.get("/reports/comments");
}

export const getAllReviewsThatHaveReportsApi = () => {
    return api.get("/reports/reviews");
}

export const getReportsForSpecificCommentApi = (commentId: number) => {
    return api.get(`reports/comments/${commentId}`);
}

export const getReportsForSpecificReviewApi = (reviewId: number) => {
    return api.get(`reports/reviews/${reviewId}`);
}

export const deleteCommentApi = (commentId: number) => {
    return api.delete(`/comments/${commentId}`);
}

export const deleteReviewApi = (reviewId: number) => {
    return api.delete(`/reviews/${reviewId}`);
}

export const deleteReportsForSpecificCommentApi = (commentId: number) => {
    return api.delete(`/reports/comments/${commentId}`);
}

export const deleteReportsForSpecificReviewApi = (reviewId: number) => {
    return api.delete(`/reports/reviews/${reviewId}`);
}
