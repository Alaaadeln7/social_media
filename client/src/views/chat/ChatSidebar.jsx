import LazyImage from "../../components/LazyImage";
import { useGetConversationsQuery } from "../../app/api/chatApiSlice";
import { Link } from "react-router-dom";
import SidebarChatSkeleton from "../../components/skeletons/SidebarChatSkeleton";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

export default function ChatSidebar() {
  const { user } = useAuth();
  const { data, isLoading } = useGetConversationsQuery();
  const { onlineUsers } = useSelector((state) => state.chat);

  const receiver = data?.data?.conversations?.map(
    (conversation) => conversation?.receiver?._id
  );

  const onlineMap = useMemo(() => {
    const map = {};
    receiver?.forEach((id) => {
      map[id] = onlineUsers?.includes(id);
    });
    return map;
  }, [receiver, onlineUsers]);

  const printUser = data?.data?.conversations?.map((conversation) => {
    const isReceiver = conversation?.receiver?._id === user?._id;
    const userToDisplay = isReceiver
      ? conversation?.sender
      : conversation?.receiver;

    const lastMessage =
      conversation?.messages?.slice(-1)[0]?.content || "No messages yet";

    return (
      <li key={conversation._id}>
        <Link
          to={`/chat/${conversation._id}`}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-300 transition-all duration-300"
        >
          <div className="relative">
            <LazyImage
              src={userToDisplay?.avatar}
              className="w-12 h-12 rounded-full object-cover border border-base-300"
              alt={userToDisplay?.fullName}
            />
            {onlineMap[userToDisplay?._id] && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex justify-between items-center w-full">
              <h1 className="font-semibold text-base text-base-content">
                {userToDisplay?.fullName}
              </h1>
              <span className="text-xs text-base-400">02:00 pm</span>
            </div>
            <p className="text-sm text-base-500 line-clamp-1 max-w-full">
              {lastMessage}
            </p>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <div className="flex flex-col gap-5 w-full p-5">
      <ul className="flex justify-between items-center bg-base-200 p-1 rounded-full">
        {["All", "Personal", "Groups"].map((label, index) => (
          <li key={index}>
            <button className="btn btn-sm btn-ghost rounded-full hover:bg-base-300">
              {label}
            </button>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-4 px-1">
        {isLoading ? <SidebarChatSkeleton /> : printUser}
      </ul>
    </div>
  );
}
