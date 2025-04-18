import { ArrowDownWideNarrow, Pen, Search } from "lucide-react";
import LazyImage from "../../components/LazyImage";
import { Link } from "react-router-dom";
import useFriend from "../../hooks/useFriend";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../app/userSlice";
import useChat from "../../hooks/useChat";
// import useIsUserOnline from "../../hooks/useIsUserOnline";
export default function MessagesSection() {
  const { friends } = useFriend();
  const dispatch = useDispatch();
  const { createConversationLoading, handleCreateConversation } = useChat();
  const printOnlineUsers = friends?.friends?.map((user) => {
    const { fullName, _id, avatar } = user;

    return (
      <li key={_id}>
        <Link
          to={`/chat/${_id}`}
          onClick={() => {
            handleCreateConversation({ receiver: _id });
            dispatch(setSelectedUser(user));
          }}
          className={`flex items-center gap-3 ${
            createConversationLoading ? "animate-pulse pointer-events-none" : ""
          }`}
        >
          <div className="relative">
            <LazyImage
              src={avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt={fullName}
            />

            <div className="absolute bottom-2 right-0 size-2 rounded-full bg-green-600"></div>
          </div>
          <h1 className="font-semibold text-md">{fullName}</h1>
        </Link>
      </li>
    );
  });

  return (
    friends?.friends?.length > 0 && (
      <section className="bg-base-100 rounded-xl">
        <header className="flex justify-between items-center px-3">
          <h1 className="font-semibold">Messages</h1>
          <button className="btn btn-ghost m-0 p-0">
            <Pen className="size-5 text-base-600" />
          </button>
        </header>
        <div className="bg-base-300 p-3 m-4 rounded-md flex justify-between items-center">
          <Search />
          <input
            className="bg-base-300 w-full outline-none border-none rounded-md px-2"
            type="search"
            placeholder="Search"
          />
          <ArrowDownWideNarrow />
        </div>
        <div>
          <ul className="p-5 flex flex-col gap-4 h-52 overflow-y-scroll">
            {printOnlineUsers}
          </ul>
          <Link to={"/chat"} className="btn btn-link flex justify-start">
            see more
          </Link>
        </div>
      </section>
    )
  );
}
