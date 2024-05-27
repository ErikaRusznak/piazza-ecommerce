import React from "react";
import {ChatContainerDetailsWrapper} from "ui";

type ChatContainerDetailsProps = {
    label: string;
    messages: any[];
    sendMessageFunction: (message: any, setMessage: (value: string) => void) => void;
};

const ChatContainerDetails = ({label, messages, sendMessageFunction}: ChatContainerDetailsProps) => {

    return (
        <ChatContainerDetailsWrapper
            isCourierUser={true}
            label={label}
            messages={messages}
            sendMessageFunction={sendMessageFunction} />
    );
};

export default ChatContainerDetails;