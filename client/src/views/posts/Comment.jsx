import { Heart } from "lucide-react";
import { useMakeLikeOnCommentMutation } from "../../app/api/postsApiSlice";
import LazyImage from "../../components/LazyImage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCheckLang from "../../hooks/useCheckLang";
import formatDate from "../../utils/formateDate";
export default function Comment(props) {
  const { checkLangText, langText } = useCheckLang();
  const [liked, setLiked] = useState(false);
  const { content, likes, author, _id, createdAt } = props.comment;
  const [makeLikeOnComment, { isLoading }] = useMakeLikeOnCommentMutation();
  const handleMakeLikeOnComment = async () => {
    await makeLikeOnComment({ commentId: _id });
    setLiked(!liked);
  };

  useEffect(() => {
    checkLangText(content);
  }, [content, checkLangText]);
  return (
    <div className="flex items-start gap-2">
      <LazyImage
        className="w-10 h-10 rounded-full object-cover"
        src={author?.avatar}
        alt={author?.fullName}
      />
      <div className="flex flex-col items-start">
        <div className="flex items-start flex-col text-start bg-base-300 p-2 rounded-xl">
          <Link className="font-bold text-md">{author?.fullName}</Link>
          <p
            className={`p-1  ${
              langText === "en" ? "text-start" : "text-end"
            } leading-relaxed
          ${langText === "en" ? "font-sens" : "font-serif"}
            `}
          >
            {content}
          </p>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-3">
            <p>{formatDate(createdAt)}</p>
            <li>
              <button
                onClick={handleMakeLikeOnComment}
                className={`btn btn-ghost  ${
                  liked && "text-red-700"
                }  flex justify-center items-center gap-1
              ${isLoading && "animate-pulse pointer-events-none"}
              `}
              >
                {likes?.length} <Heart className="size-5" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
