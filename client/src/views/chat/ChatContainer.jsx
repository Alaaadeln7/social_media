import LazyImage from "../../components/LazyImage";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "./FormatMessageTime";
import { useEffect, useRef } from "react";
import WaveformPlayer from "./WaveformPlayer";
import ChatContainerHeader from "./ChatContainerHeader";
import MessageSkeleton from "../../components/skeletons/MessageSkeleton";
import { Link } from "react-router-dom";
import NoChatSelected from "./NoChatSelected";
import useCheckLang from "../../hooks/useCheckLang";
import useAuth from "../../hooks/useAuth";
import useIsUserOnline from "../../hooks/useIsUserOnline";
import { useSelector } from "react-redux";

export default function ChatContainer({
  messages,
  getConversationLoading,
  conversationId,
  receiver,
}) {
  const messageEndRef = useRef(null);
  const { langText } = useCheckLang();
  const { user } = useAuth();
  const userIsOnline = useIsUserOnline(receiver);
  const { chatTheme } = useSelector((state) => state.chat);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (getConversationLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatContainerHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  console.log(chatTheme);
  return (
    <section className="flex-1 flex flex-col overflow-hidden bg-base-100 relative">
      <div className="flex-1 overflow-y-auto px-4 pt-24 pb-28 space-y-5 h-screen">
        {messages?.length > 0 ? (
          messages?.map((message) => {
            const isSender = message?.sender?._id === user?._id;

            return (
              <div
                key={message._id}
                className={`chat ${
                  isSender ? "chat-end" : "chat-start"
                } transition-all`}
              >
                <div className="chat-image avatar relative">
                  <Link
                    to={`/profile/${message?.sender?._id}`}
                    className="size-10 rounded-full border border-base-300 hover:scale-105 transition-transform"
                  >
                    <LazyImage
                      src={message?.sender?.avatar}
                      alt="profile avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>

                  {userIsOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full shadow-md" />
                  )}
                </div>

                <div className="chat-header mb-1 flex items-center gap-2 text-xs text-base-500 font-medium">
                  <time>{formatMessageTime(message.createdAt)}</time>
                </div>

                <div
                  className={`chat-bubble flex flex-col shadow-md ${
                    isSender
                      ? "bg-primary text-white"
                      : "bg-base-200 text-base-content"
                  } px-4 py-3 rounded-2xl max-w-xs sm:max-w-sm md:max-w-md break-words`}
                  style={isSender ? { background: chatTheme } : undefined}
                >
                  {message.image && (
                    <LazyImage
                      src={message.image}
                      alt="Attachment"
                      className="rounded-md mb-2 max-w-[200px] sm:max-w-[250px] shadow-sm"
                    />
                  )}

                  {message.content && (
                    <p
                      className={`leading-relaxed ${
                        langText === "en"
                          ? "text-left font-sans"
                          : "text-right font-serif"
                      }`}
                    >
                      {message.content}
                    </p>
                  )}

                  {message.record && (
                    <div className="mt-2">
                      <WaveformPlayer audioUrl={message.record} />
                    </div>
                  )}

                  {message.isRead && isSender && (
                    <div className="flex justify-end mt-1 text-xs text-base-400">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 9.25a.75.75 0 011.06-.02L8 13.063l8.938-8.938a.75.75 0 111.061 1.061l-9.5 9.5a.75.75 0 01-1.06 0l-5-5a.75.75 0 01.02-1.06z" />
                        </svg>
                        Read
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <NoChatSelected />
        )}

        <div ref={messageEndRef} />
      </div>

      <MessageInput conversationId={conversationId} receiver={receiver} />
    </section>
  );
}
