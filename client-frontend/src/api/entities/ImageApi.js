import { api } from '../ApiClient'

export const getImageForCategoryApi = (imageURL) => {
    return api.get(`${imageURL}`, { responseType: 'arraybuffer' })
}

export const addImageApi = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};