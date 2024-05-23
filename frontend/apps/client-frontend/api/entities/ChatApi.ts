import {api} from "../ApiClient";

export const getMessagesForSenderAndRecipientApi = (senderId: number, recipientId: number) => {
    return api.get(`/messages/${senderId}/${recipientId}`)
}

export const markMessagesAsReadApi = (senderId: number, recipientId: number) => {
    return api.put(`/messages/markAsRead/${senderId}/${recipientId}`)
}

export const getGroupChatsForBuyerApi = (buyerEmail: string) => {
    return api.get(`/group-chat/buyer/${buyerEmail}`);
}

export const getMessagesForGroupChatApi = (buyerId: number, courierId: number, sellerId: number, orderId: number) => {
    return api.get(`/group-messages/${buyerId}/${courierId}/${sellerId}/${orderId}`);
}