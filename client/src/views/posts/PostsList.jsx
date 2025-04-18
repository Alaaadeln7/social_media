import { useGetAllPostsQuery } from "../../app/api/postsApiSlice";
import Post from "./Post";
import PostSkeleton from "../../components/skeletons/PostSkeleton";

export default function PostsList() {
  const { data: posts, isLoading } = useGetAllPostsQuery();
  if (isLoading) {
    return [1, 2, 3, 4, 5].map((_, index) => <PostSkeleton key={index} />);
  }
  const printPosts = posts?.posts?.map((post) => (
    <Post post={post} key={post._id} />
  ));
  return <div>{printPosts}</div>;
}
