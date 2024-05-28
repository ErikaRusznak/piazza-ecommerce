import {api} from "components";

export const getGroupChatsForBuyerApi = (buyerEmail: string) => {
    return api.get(`/group-chat/buyer/${buyerEmail}`);
}
