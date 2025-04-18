import { Heart } from "lucide-react";
import { useState } from "react";
import { useToggleLikeMutation } from "../../app/api/postsApiSlice";
export default function LikesButton(props) {
  const { likes, postId } = props;
  const [liked, setLiked] = useState(false);
  const [toggleLike, { isLoading }] = useToggleLikeMutation();
  const handleLike = async () => {
    await toggleLike({ postId });
    setLiked(!liked);
  };
  return (
    <button
      onClick={handleLike}
      className={`btn btn-ghost ${
        liked ? "text-red-700" : "text-base-800"
      }  flex justify-center items-center gap-1
        ${isLoading && "animate-pulse pointer-events-none"}
        `}
    >
      <Heart className="size-5" />
      <span className="px-1">{likes?.length}</span>
      <span className="hidden sm:inline">Likes</span>
    </button>
  );
}
