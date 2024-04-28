import {api} from "../ApiClient";

export const getMessagesForSenderAndRecipientApi = (senderId: number, recipientId: number) => {
    return api.get(`/messages/${senderId}/${recipientId}`)
}

export const markMessagesAsReadApi = (senderId: number, recipientId: number) => {
    return api.put(`/messages/markAsRead/${senderId}/${recipientId}`)
}

export const getGroupChatsForBuyer = (buyerId: number) => {
    return api.get(`/group-chat/buyer/${buyerId}`);
}