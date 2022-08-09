import { Fragment, useEffect } from "react";
import useMessages from "../../../hooks/use-messages";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

const ChatBox = ({ sendurUid, recieverUid }) => {
  const {
    messages,
    fetchMessages,
    updateMessages,
  } = useMessages(sendurUid, recieverUid);

  console.log(messages);

  const chatInputSubmitHandler = (message) => {
    console.log(message);
    updateMessages(message);
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <Fragment>
      <ChatContainer messages={messages} />
      <ChatInput onSubmit={chatInputSubmitHandler} />
    </Fragment>
  );
};

export default ChatBox;
