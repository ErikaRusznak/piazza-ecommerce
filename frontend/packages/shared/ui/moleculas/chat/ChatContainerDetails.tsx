import {ChatContainerDetailsWrapper} from "../../index";

type ChatContainerDetailsProps = {
    label: string
    id: number;
    messages: any[];
    sendMessageFunction: (message: any, setMessage: (value: string) => void) => void;
    privateChat: boolean;
    userRole: string;
};

const ChatContainerDetails = ({label, id, messages, sendMessageFunction, privateChat, userRole}: ChatContainerDetailsProps) => {

    const distinctSenderFromReceiverPrivateFunction = (mess: any, val: string | number) => {
        return mess.senderId === val;
    };
    const distinctSenderFromReceiverGroupFunction = (mess: any, val: string | number) => {
        return mess.senderRole === val;
    };
    const distinctSenderFromReceiver = (mess: any): boolean => {
        if(privateChat)
            return distinctSenderFromReceiverPrivateFunction(mess, id);
        return distinctSenderFromReceiverGroupFunction(mess, userRole);
    };

    return (
        <ChatContainerDetailsWrapper
            label={label}
            messages={messages}
            sendMessageFunction={sendMessageFunction}
            distinctSenderFromReceiver={distinctSenderFromReceiver}
        />
    );
};

export default ChatContainerDetails;