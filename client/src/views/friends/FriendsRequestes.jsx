import LazyImage from "../../components/LazyImage";
import { UserRoundMinus, UserRoundPlus } from "lucide-react";
import useFriend from "../../hooks/useFriend";
import MainButtonLoader from "../../components/MainButtonLoader";
import FriendRequestSkeleton from "../../components/skeletons/FriendRequestSkeleton";
export default function FriendsRequestes() {
  const {
    friendRequests,
    handleAcceptFriend,
    getFriendRequestsLoading,
    handleRejectFriend,
  } = useFriend();
  const printfriends = friendRequests?.requests?.map((friend) => (
    <li
      key={friend}
      className="flex gap-3 items-start hover:bg-base-200 p-2 rounded-xl transition-colors"
    >
      <LazyImage
        className="w-10 h-10 rounded-full object-cover"
        src={friend?.avatar}
        alt={friend?.fullName}
      />
      <div className="flex flex-col items-start">
        <h1 className="font-semibold text-xl line-clamp-1">
          {friend?.fullName}
        </h1>
        <p>3m ago</p>
      </div>
      <button
        onClick={() => handleAcceptFriend(friend?._id)}
        className="self-center btn btn-ghost hover:bg-primary"
        disabled={getFriendRequestsLoading}
      >
        {getFriendRequestsLoading ? (
          <MainButtonLoader />
        ) : (
          <UserRoundPlus className="size-5" />
        )}
      </button>
      <button
        onClick={() => handleRejectFriend(friend?._id)}
        className="self-center btn btn-ghost hover:bg-primary"
        disabled={getFriendRequestsLoading}
      >
        {getFriendRequestsLoading ? (
          <MainButtonLoader />
        ) : (
          <UserRoundMinus className="size-5" />
        )}
      </button>
    </li>
  ));
  return (
    <section className="w-6/12 flex flex-col items-center justify-center bg-base-100 rounded-xl p-3 ">
      <div>
        <h1 className="self-start text-2xl font-semibold mb-5 text-base-100">
          Friends Requestes
        </h1>
      </div>
      <ul className="flex flex-col mt-10 w-full">
        {getFriendRequestsLoading ? <FriendRequestSkeleton /> : printfriends}
      </ul>
    </section>
  );
}
