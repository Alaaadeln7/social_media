import { Plus } from "lucide-react";
import LazyImage from "../../components/LazyImage";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
export default function CreateStory() {
  const { user } = useAuth();
  return (
    <Link to={`/create-story`}>
      <div className="relative">
        <LazyImage
          className="w-10 h-10 md:w-20 md:h-20 object-cover transition-transform duration-500 border-blue-600 rounded-full"
          src={user?.avatar}
          alt={"your story"}
        />
        <button className="absolute bottom-0 right-0 transform bg-blue-500 text-white  rounded-full p-1">
          <Plus className="size-5" />
        </button>
      </div>
      <h1 className="font-semibold text-md">{user?.fullName}</h1>
    </Link>
  );
}
