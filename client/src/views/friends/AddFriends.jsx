import { useFormik } from "formik";
import LazyImage from "../../components/LazyImage";
import { UserRoundPlus } from "lucide-react";
import useFriend from "../../hooks/useFriend";
import MainButtonLoader from "../../components/MainButtonLoader";
import AddFriendsSkeleton from "../../components/skeletons/AddFriendsSkeleton";
export default function AddFriends() {
  const { handleAddFriend, isAdding, users, usersLoading } = useFriend();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const printfriends = users?.users.map((friend) => (
    <li
      key={friend}
      className="flex gap-3 justify-between items-start hover:bg-base-300 p-2 rounded-xl transition-colors"
    >
      <div className="flex gap-3 items-start">
        <LazyImage
          className="w-10 h-10 rounded-full object-cover"
          src={friend?.avatar}
          alt={friend?.fullName}
        />
        <div className="flex flex-col items-start">
          <h1 className="font-semibold  text-md line-clamp-1">
            {friend?.fullName}
          </h1>
          <p>3m ago</p>
        </div>
      </div>
      <button
        disabled={isAdding}
        onClick={() => handleAddFriend(friend?._id)}
        className="self-center btn btn-ghost hover:bg-primary hover:text-white "
      >
        {isAdding ? <MainButtonLoader /> : <UserRoundPlus className="size-5" />}
      </button>
    </li>
  ));
  return (
    <section className="w-6/12 flex flex-col items-center justify-center bg-base-100 rounded-xl p-3 ">
      <div>
        <h1 className="self-start text-2xl font-semibold mb-5">Add Friends</h1>
        <form className="flex gap-3" onSubmit={formik.handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="Search by name or email"
              className="input input-bordered w-full max-w-xs bg-base-200"
              id="search"
              name="search"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.search}
            />
          </div>
          <button type="submit" className="btn btn-primary text-white">
            Search
          </button>
        </form>
      </div>
      <ul className="flex flex-col mt-10 w-full h-96 overflow-y-auto gap-3">
        {usersLoading ? <AddFriendsSkeleton /> : printfriends}
      </ul>
    </section>
  );
}
