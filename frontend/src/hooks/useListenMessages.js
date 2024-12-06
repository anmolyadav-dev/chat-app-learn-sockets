import React from "react";
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (selectedConversation._id === newMessage.senderId)
        newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [messages, setMessages, socket]);
};

export default useListenMessages;
