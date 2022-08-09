import { useState, useCallback } from "react";
import { getData, putData, patchData } from "../firebase/database-utility";

const useConversations = (uid) => {
  const [conversations, setConversations] = useState([]);

  const fetchProfileData = async (uid) => {
    const response = await getData(`/users/${uid}`);
    const { name, tagline } = response.data;
    return { name, tagline };
  };

  const fetchConversations = async (uid) => {
    const response = await getData(`/users/${uid}/conversations`);
    if (response.ok && response.data) {
      return response.data;
    } else {
      return [];
    }
  };

  const fetchTransformedConversations = useCallback(async (uid) => {
    const response = await fetchConversations(uid);

    const dataPromises = response.map(async (uid) => {
      const { name, tagline } = await fetchProfileData(uid);
      return { name, tagline, uid };
    });
    const transformedData = await Promise.all(dataPromises);
    return transformedData;
  }, []);

  const fetchTransformedCurrentConversations = useCallback(async () => {
    const transformedData = await fetchTransformedConversations(uid);
    setConversations(transformedData);
  }, [uid, fetchTransformedConversations]);

  const addConversation = async (uid, recieverUid) => {
    //TODO
    try {
      let senderResponse = await fetchConversations(uid);
      senderResponse.push(recieverUid);
      let recieverResponse = await fetchConversations(recieverUid);
      recieverResponse.push(uid);

      console.log({ senderResponse, recieverResponse, recieverUid });

      patchData(`/users/${uid}`, { conversations: senderResponse });
      patchData(`/users/${recieverUid}`, { conversations: recieverResponse });
    } catch (e) {
      console.log(e);
    }
  };

  const createConversation = (
    uid,
    recieverUid,
    recieverName,
    recieverTagline
  ) => {
    console.log("create");
    putData(`/conversations/${uid}${recieverUid}`, {
      messages: [{ type: "begin", message: "conversation started" }],
    });
    putData(`/conversations/${recieverUid}${uid}`, {
      messages: [{ type: "begin", message: "conversation started" }],
    });
    addConversation(uid, recieverUid).then(() => {
      setConversations((state) => [
        ...state,
        { uid: recieverUid, name: recieverName, tagline: recieverTagline },
      ]);
    });
  };

  return {
    conversations,
    fetchTransformedCurrentConversations,
    createConversation,
  };
};

export default useConversations;
