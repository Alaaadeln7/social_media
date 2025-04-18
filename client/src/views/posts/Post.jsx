import {
  Bookmark,
  MessageCircle,
  Repeat2,
  Share2,
  UserRoundPen,
} from "lucide-react";
import LazyImage from "../../components/LazyImage";
import { useCallback, useEffect, useMemo, useState } from "react";
import CommentsSection from "./CommentsSection";
import LikesButton from "./LikesButton";

import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import usePosts from "../../hooks/usePosts";
import MainButtonLoader from "../../components/MainButtonLoader";
import UpdatePostModal from "./UpdatePostModal.jsx";
import ShareModal from "./ShareModal.jsx";
import PostHeader from "./PostHeader.jsx";
export default function Post(props) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [langText, setLangText] = useState("");
  const { onlineUsers } = useSelector((state) => state.user);
  const { user } = useAuth();
  const { handleSavePost, savePostLoading } = usePosts();
  const [showComments, setShowComments] = useState(false);
  const { content, createdAt, author, image, _id, comments } = props.post;
  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  const isUser = author?._id === user?._id;
  const userIsOnline = useMemo(
    () => onlineUsers.includes(author?._id),
    [author, onlineUsers]
  );
  const checkLangText = useCallback(() => {
    const arabicRegex = /[\u0600-\u06FF]/;
    if (arabicRegex.test(content)) {
      setLangText("ar");
    } else {
      setLangText("en");
    }
  }, [content]);

  useEffect(() => {
    checkLangText();
  }, [checkLangText]);
  return (
    <article className="bg-base-100 p-4 rounded-2xl shadow-sm my-4 w-full">
      <PostHeader
        userIsOnline={userIsOnline}
        isUser={isUser}
        author={author}
        createdAt={createdAt}
        _id={_id}
        setOpenUpdateModal={setOpenUpdateModal}
      />
      <div className="mb-4">
        <p
          className={`${
            langText === "en" ? "text-start" : "text-end"
          } leading-relaxed
          ${langText === "en" ? "font-sens" : "font-serif"}
            `}
        >
          {content}
        </p>
      </div>

      {image && (
        <div className="rounded-xl overflow-hidden mb-4">
          <LazyImage
            src={image}
            alt="post"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="divider my-2"></div>

      <div className="px-1 flex justify-between items-center flex-wrap">
        <ul className="flex gap-2 items-center">
          <li>
            <LikesButton postId={_id} likes={props.post.likes} />
          </li>
          <li>
            <button
              onClick={handleShowComments}
              className="btn btn-sm btn-ghost gap-1 hover:bg-base-200"
            >
              <MessageCircle className="w-4 h-4" />
              {comments.length}
              <span className="hidden sm:inline">Comment</span>
            </button>
          </li>
          <li>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm btn-ghost gap-1 hover:bg-base-200"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-xl shadow-lg z-50 w-52 p-2 text-sm"
              >
                <li>
                  <button
                    onClick={() => setOpenShareModal(true)}
                    className="btn btn-ghost hover:bg-base-200"
                  >
                    Share with comment <UserRoundPen className="w-4 h-4" />
                  </button>
                </li>
                <li>
                  <button className="btn btn-ghost hover:bg-base-200">
                    Share only <Repeat2 className="w-4 h-4" />
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        {!user.savedPosts.includes(_id) && (
          <button
            onClick={() => handleSavePost(_id)}
            className="btn btn-sm btn-ghost hover:bg-base-50"
            disabled={savePostLoading}
          >
            {savePostLoading ? (
              <MainButtonLoader />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {showComments && <CommentsSection comments={comments} postId={_id} />}

      {openUpdateModal && (
        <UpdatePostModal
          setOpenUpdateModal={setOpenUpdateModal}
          content={content}
          postId={_id}
        />
      )}

      {openShareModal && (
        <ShareModal
          setOpenShareModal={setOpenShareModal}
          image={image}
          content={content}
          author={author}
        />
      )}
    </article>
  );
}
