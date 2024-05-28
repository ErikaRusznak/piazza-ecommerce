import {api} from "components";

export const getGroupChatsForSellerApi = (sellerEmail: string) => {
    return api.get(`/group-chat/seller/${sellerEmail}`);
}