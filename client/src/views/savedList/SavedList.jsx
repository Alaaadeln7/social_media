import { Loader } from "lucide-react";
import usePosts from "../../hooks/usePosts";
import Post from "../posts/Post";
export default function SavedList() {
  const { getSavePostLoading, savedPosts } = usePosts();
  const printSavedPost = savedPosts?.data?.map((post) => (
    <Post post={post} key={post._id} />
  ));
  if (getSavePostLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="mt-20">
      {getSavePostLoading ? (
        <>
          <h1 className="md:text-2xl sm:text-md">no posts saved</h1>
        </>
      ) : (
        printSavedPost
      )}
    </div>
  );
}
