import AddFriends from "./AddFriends";
import FriendsRequestes from "./FriendsRequestes";
export default function Friends() {
  return (
    <div className="mt-20 ml-60 flex gap-10 justify-center items-start">
      <AddFriends />
      <FriendsRequestes />
    </div>
  );
}
