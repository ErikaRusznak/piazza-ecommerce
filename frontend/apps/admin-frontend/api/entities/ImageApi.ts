import { api } from 'components';

export const getImageForCategoryApi = (imageURL: string) => {
    return api.get(`${imageURL}`, { responseType: 'arraybuffer' })
}

export const addImageApi = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};