import toast from "react-hot-toast";
import {
  useAcceptFriendMutation,
  useAddFriendsMutation,
  useGetAllUsersQuery,
  useGetFriendRequestsQuery,
  useGetFriendsQuery,
  useRejectedFriendsMutation,
} from "../app/api/friendsApiSlice";

export default function useFriend() {
  const { data: friends, isLoading: getFriendsLoading } = useGetFriendsQuery();
  const [addFriend, { isLoading: isAdding }] = useAddFriendsMutation();
  const [acceptFriend, { isLoading: isAccepting }] = useAcceptFriendMutation();
  const [rejectFriend, { isLoading: isRejecting }] =
    useRejectedFriendsMutation();
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: friendRequests, isLoading: getFriendRequestsLoading } =
    useGetFriendRequestsQuery();
  // handlers
  const handleAddFriend = async (friendId) => {
    const response = await addFriend(friendId);
    if (response.data) {
      console.log(response.data);
      toast.success("request sent successfully");
    }
    if (response.error) {
      toast.error(response.error.message);
    }
  };
  const handleAcceptFriend = async (friendId) => {
    const response = await acceptFriend(friendId);
    if (response.data) {
      toast.success("Friend request accepted");
    }
    if (response.error) {
      toast.error(response.error.message);
    }
  };
  const handleRejectFriend = async (friendId) => {
    const response = await rejectFriend(friendId);
    if (response.data) {
      toast.success("Friend request rejected");
    }
    if (response.error) {
      toast.error(response.error.message);
    }
  };
  return {
    handleAddFriend,
    handleAcceptFriend,
    handleRejectFriend,
    getFriendsLoading,
    isAdding,
    isAccepting,
    isRejecting,
    friends,
    users,
    usersLoading,
    friendRequests,
    getFriendRequestsLoading,
  };
}
