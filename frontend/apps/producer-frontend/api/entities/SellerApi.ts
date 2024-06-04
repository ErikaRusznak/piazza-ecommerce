import {api} from "components";

export const getSellerByIdApi = (id: number) => {
    return api.get(`/api/sellers/${id}`);
}
