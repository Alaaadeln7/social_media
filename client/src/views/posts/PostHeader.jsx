import MainButtonLoader from "../../components/MainButtonLoader";
import { EllipsisVertical, Pencil, Trash2, UserRoundPlus } from "lucide-react";
import formatDate from "../../utils/formateDate";
import LazyImage from "../../components/LazyImage";
import usePosts from "../../hooks/usePosts";
import { Link } from "react-router-dom";
export default function PostHeader({
  userIsOnline,
  isUser,
  author,
  createdAt,
  _id,
  setOpenUpdateModal,
}) {
  const { handleDeletePost, deletePostLoading } = usePosts();
  return (
    <header className="flex justify-between items-start mb-4">
      <div className="flex items-start gap-3">
        <Link
          to={`/profile/${author?._id}`}
          className="flex items-start gap-3 relative"
        >
          <div className="relative">
            <LazyImage
              className="w-10 h-10 rounded-full object-cover"
              src={author?.avatar}
              alt="avatar"
            />
            {userIsOnline && (
              <span className="absolute bottom-2 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-start">{author?.fullName}</h1>
            <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
          </div>
        </Link>
        {!isUser && (
          <button className="btn btn-sm btn-circle btn-ghost text-primary hover:bg-blue-50">
            <UserRoundPlus className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-ghost hover:bg-base-200">
          <EllipsisVertical className="w-5 h-5" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-xl shadow-lg z-50 w-48 p-2 text-sm"
        >
          {isUser && (
            <>
              <li>
                <button
                  onClick={() => setOpenUpdateModal(true)}
                  className="btn btn-ghost text-start hover:bg-base-200 flex justify-end"
                >
                  Edit <Pencil className="w-4 h-4 text-blue-600" />
                </button>
              </li>
              <li>
                <button
                  disabled={deletePostLoading}
                  onClick={() => handleDeletePost(_id)}
                  className="btn btn-ghost text-start hover:bg-base-200 flex justify-end"
                >
                  {deletePostLoading ? (
                    <MainButtonLoader />
                  ) : (
                    <>
                      Delete <Trash2 className="w-4 h-4 text-red-500" />
                    </>
                  )}
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
