import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetConversationQuery } from "../../app/api/chatApiSlice";
import { addMessage, setMessages } from "../../app/chatSlice.js";
import useAuth from "../../hooks/useAuth.js";

import Header from "../header/Header";
import ChatContainer from "./ChatContainer";
import ChatContainerHeader from "./ChatContainerHeader";

export default function SingleChat() {
  const { user } = useAuth();
  const { conversationId } = useParams();
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  const { messages } = useSelector((state) => state.chat);

  const { data, isLoading: getConversationLoading } = useGetConversationQuery(
    conversationId,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const conversation = data?.data?.conversation;

  // تحديد الـ sender و الـ receiver
  const sender = conversation?.sender;
  const receiver = conversation?.receiver;

  const userToDisplay = user?._id === receiver?._id ? sender : receiver;

  useEffect(() => {
    if (conversation?.messages) {
      dispatch(setMessages(conversation.messages));
    }
  }, [dispatch, conversation?.messages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (window.socket?.connected) {
      window.socket.emit("joinRoom", conversationId);
    }
  }, [messages, conversationId]);

  useEffect(() => {
    if (!window.socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
    };

    window.socket.on("newMessage", handleNewMessage);

    return () => {
      if (!window.socket) return;
      window.socket.off("newMessage", handleNewMessage);
    };
  }, [messages, dispatch]);

  return (
    <div className="flex justify-center items-center">
      <Header />

      <section className="mt-20 sm:w-10/12 w-full overflow-hidden relative">
        <ChatContainerHeader receiver={userToDisplay} />

        <ChatContainer
          sender={sender}
          receiver={receiver}
          messages={messages}
          getConversationLoading={getConversationLoading}
          conversationId={conversationId}
        />

        <div ref={messageEndRef} />
      </section>
    </div>
  );
}
