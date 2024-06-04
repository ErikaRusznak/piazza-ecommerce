import { api } from 'components';

export const getLocationsApi = () => {
    return api.get("/api/cities")
}
