"use client";

import {ChatContainerDetailsWrapper} from "../../index";
import {useEffect, useState} from "react";
import {getOrderByIdApi, getUserByIdApi} from "components";
import {getSellerByIdApi} from "producer-frontend/api/entities/SellerApi";

type ChatContainerDetailsProps = {
    id: number;
    messages: any[];
    sendMessageFunction: (message: any, setMessage: (value: string) => void) => void;
    privateChat: boolean;
    userRole: string;
    recipientId?: null | number;
    orderId?: null | number;
};

const ChatContainerDetails = ({id, messages, sendMessageFunction, privateChat, userRole, recipientId, orderId}: ChatContainerDetailsProps) => {

    const [username, setUsername] = useState<string>("");
    const [orderNumber, setOrderNumber] = useState<string>("");

    const distinctSenderFromReceiverPrivateFunction = (mess: any, val: string | number) => {
        return mess.senderId === val;
    };
    const distinctSenderFromReceiverGroupFunction = (mess: any, val: string | number) => {
        return mess.senderRole === val;
    };
    const distinctSenderFromReceiver = (mess: any): boolean => {
        if (privateChat)
            return distinctSenderFromReceiverPrivateFunction(mess, id);
        return distinctSenderFromReceiverGroupFunction(mess, userRole);
    };

    const getUserById = (id: number) => {
        getUserByIdApi(id)
            .then((res) => {
                setUsername(res.data.firstName + " " + res.data.lastName)
            })
            .catch((err) => {
                console.error(err);
            })
    };

    const getSellerById = (id: number) => {
        getSellerByIdApi(id)
            .then((res) => {
                setUsername(res.data.alias);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getOrderById = (id: number) => {
        getOrderByIdApi(id)
            .then((res) => {
                setOrderNumber(res.data.orderNumber);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        if(recipientId) {
            if(userRole === "SELLER")
                getUserById(recipientId);
            if(userRole === "CLIENT")
                getSellerById(recipientId);
        }
        if(orderId) {
            getOrderById(orderId);
        }
    }, [recipientId, orderId]);

    return (
        <ChatContainerDetailsWrapper
            label={recipientId ? `Chat with ${username}` : `Chat for Order #${orderNumber}`}
            messages={messages}
            sendMessageFunction={sendMessageFunction}
            distinctSenderFromReceiver={distinctSenderFromReceiver}
        />
    );
};

export default ChatContainerDetails;