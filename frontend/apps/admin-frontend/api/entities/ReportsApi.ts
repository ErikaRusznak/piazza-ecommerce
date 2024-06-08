import { api } from 'components';

export const getAllCommentsThatHaveReportsApi = () => {
    return api.get("/api/reports/comments");
}

export const getAllReviewsThatHaveReportsApi = () => {
    return api.get("/api/reports/reviews");
}

export const getReportsForSpecificCommentApi = (commentId: number) => {
    return api.get(`/api/reports/comments/${commentId}`);
}

export const getReportsForSpecificReviewApi = (reviewId: number) => {
    return api.get(`/api/reports/reviews/${reviewId}`);
}

export const deleteCommentApi = (commentId: number) => {
    return api.delete(`/api/comments/${commentId}`);
}

export const deleteReviewApi = (reviewId: number) => {
    return api.delete(`/api/reviews/${reviewId}`);
}

export const deleteReportsForSpecificCommentApi = (commentId: number) => {
    return api.delete(`/api/reports/comments/${commentId}`);
}

export const deleteReportsForSpecificReviewApi = (reviewId: number) => {
    return api.delete(`/api/reports/reviews/${reviewId}`);
}
