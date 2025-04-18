import PostsList from "../posts/PostsList";
import CreatePost from "../posts/CreatePost";
import SortingList from "./SortingList";
// import StoriesList from "./StoriesList";

export default function CenterSide() {
  return (
    <article className="rounded-xl p-2 lg:w-6/12 sm:w-10/12 lg:static md:absolute md:right-0 md:top-10 md:w-8/12 mt-16 w-screen px-3">
      {/* <StoriesList /> */}
      <CreatePost />
      <SortingList />
      <PostsList />
    </article>
  );
}
