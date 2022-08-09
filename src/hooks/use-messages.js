import { useState, useCallback } from "react";
import { getData, patchData } from "../firebase/database-utility";

const useMessages = (senderUid, recieverUid) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = useCallback(async () => {
    if (!senderUid || !recieverUid) {
      return;
    }
    const response = await getData(`/conversations/${senderUid}${recieverUid}`);
    if (response.ok) {
      if (response.data) {
        setMessages(response.data.messages);
      }
    }
  }, [senderUid, recieverUid]);

  const updateMessages = (message) => {
    if (!senderUid || !recieverUid) {
      return;
    }
    const currentMessages = messages;
    currentMessages.push({ type: "sent", message });
    const recieverMessages = currentMessages.map((val) => {
      let type = "begin";
      if (val.type === "sent") {
        type = "recieved";
      } else if (val.type === "recieved") {
        type = "sent";
      }
      return { ...val, type };
    });
    patchData(`/conversations/${senderUid}${recieverUid}`, {
      messages: currentMessages,
    });
    patchData(`/conversations/${recieverUid}${senderUid}`, {
      messages: recieverMessages,
    });
    setMessages(currentMessages);
  };

  return {
    messages,
    fetchMessages,
    updateMessages,
  };
};

export default useMessages;
