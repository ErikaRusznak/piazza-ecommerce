import React from "react";
import {ChatContainerDetailsWrapper} from "ui";

type ChatContainerDetailsProps = {
    label: string;
    messages: any[];
    sendMessageFunction: (message: any, setMessage: (value: string) => void) => void;
    id: number;
};

const ChatContainerDetails = ({id, label, messages, sendMessageFunction}: ChatContainerDetailsProps) => {

    return (
        <ChatContainerDetailsWrapper
            id={id}
            isCourierUser={true}
            label={label}
            messages={messages}
            sendMessageFunction={sendMessageFunction} />
    );
};

export default ChatContainerDetails;