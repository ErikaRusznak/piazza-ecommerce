import {api} from "components";

export const getGroupChatsForCourierApi = (courierEmail: string) => {
    return api.get(`/group-chat/courier/${courierEmail}`);
}