import {
  useCreatePostMutation,
  useGetPostsByUserIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useSavePostMutation,
  useGetSavePostQuery,
} from "../app/api/postsApiSlice";
import toast from "react-hot-toast";
export default function usePosts() {
  const [createPost, { isLoading: createPostLoading }] =
    useCreatePostMutation();
  const [deletePost, { isLoading: deletePostLoading }] =
    useDeletePostMutation();
  useGetPostsByUserIdQuery();
  const [updatePost, { isLoading: updatePostLoading }] = useUpdatePostMutation();
  const [savePost, { isLoading: savePostLoading }] = useSavePostMutation();
  const { data: savedPosts, isLoading: getSavePostLoading } = useGetSavePostQuery();
  const handleCreatePost = async (data) => {
    const res = await createPost(data);
    if (res.data) {
      toast.success("Post created successfully");
    }
  };
  const handleDeletePost = async (postId) => {
    const res = await deletePost(postId);
    if (res.data) {
      toast.success("Post deleted successfully");
    }
  };
  const handleUpdatePost = async (data) => {
    const res = await updatePost(data);
    if (res.data) {
      toast.success("Post updated successfully");
    }
  };
  const handleSavePost = async (data) => {
    console.log({ postId: data })
    const res = await savePost({ postId: data });
    if (res?.data) {
      toast.success("Post saved successfully");
    }
  }

  return {
    handleCreatePost,
    handleDeletePost,
    deletePostLoading,
    createPostLoading,
    handleUpdatePost,
    updatePostLoading,
    handleSavePost,
    savePostLoading,
    savedPosts,
    getSavePostLoading
  };
}
