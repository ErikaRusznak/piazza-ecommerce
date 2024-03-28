import {api} from "../ApiClient";

export const getMessagesForSenderAndReceiverApi = (senderId: number, receiverId: number) => {
    return api.get(`/messages/${senderId}/${receiverId}`)
}