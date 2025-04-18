import { Link, useNavigate } from "react-router-dom";
import LazyImage from "../../components/LazyImage";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function ChatContainerHeader({ receiver }) {
  const navigate = useNavigate();
  const { onlineUsers } = useSelector((state) => state.user);
  const { typing } = useSelector((state) => state.chat);
  const userIsOnline = useMemo(
    () => receiver && onlineUsers?.includes(receiver._id),
    [onlineUsers, receiver]
  );

  if (!receiver) return null;

  const { fullName, avatar, _id } = receiver;
  return (
    <div className="p-4 fixed top-20 w-full z-40 bg-base-100 sm:w-10/12 flex items-center justify-between border-b border-base-300">
      <div className="flex items-center gap-3">
        <button className="btn btn-sm btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Link to={`/profile/${_id}`} className="flex items-center gap-2">
          <div className="relative">
            <LazyImage
              src={avatar}
              alt={fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            {userIsOnline && (
              <span className="absolute bottom-2 right-0 w-2 h-2 bg-green-500 rounded-full border border-base-100"></span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{fullName}</span>
            {userIsOnline && (
              <p className="font-sm text-xs text-green-500">online</p>
            )}
            {typing && (
              <span className="text-gray-500 text-xs animate-pulse">
                typing...
              </span>
            )}
          </div>
        </Link>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <button
          tabIndex={0}
          className="btn btn-sm btn-circle btn-ghost hover:bg-base-300"
        >
          <EllipsisVertical className="w-5 h-5" />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box bg-base-100 border border-base-200 shadow-md mt-2 p-2 w-52 z-[999]"
        >
          <li>
            <Link to={"change-theme"} className="text-left">
              Chat Theme
            </Link>
          </li>
          <li>
            <button className="text-left">Mute Notifications</button>
          </li>
          <li>
            <button className="text-left">Block</button>
          </li>
          <li>
            <button className="text-left text-red-500">
              Remove Chat Content
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
