import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  Bookmark,
  ChevronDown,
  MessageCircle,
  Search,
  Settings,
} from "lucide-react";
import LazyImage from "../../components/LazyImage";
import useAuth from "../../hooks/useAuth";
import NotificationSection from "./NotificationSection";
export default function Header() {
  const { user } = useAuth();
  return (
    <header className="fixed top-0 w-full z-50 bg-base-100 flex justify-between items-center sm:px-10 px-2 h-20">
      {/* left side */}
      <Logo />
      {/* center side */}
      <div className="bg-base-200 max-w-[500px] rounded-md space-x-2 sm:flex hidden py-2 px-2">
        <Search className="size-5" />
        <form>
          <input
            className="bg-transparent outline-none border-none w-full"
            type="search"
            placeholder="Search"
          />
        </form>
      </div>
      {/* right side */}
      <div className="flex justify-center items-center gap-2">
        <NotificationSection />
        <Link to={"/saved-list"} className="bg-base-200 p-2 rounded-lg">
          <Bookmark className="size-5" />
        </Link>
        <Link to={"/chat"} className="bg-base-200 p-2 rounded-lg">
          <MessageCircle className="size-5" />
        </Link>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost m-1">
            <LazyImage
              className="w-10 h-10 rounded-full object-cover"
              src={user?.avatar}
              alt={user?.username}
            />
            <h1 className="text-md font-bold sm:flex hidden">
              {user?.fullName}
            </h1>
            <ChevronDown className="size-5 sm:flex hidden" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-200 menu rounded-box z-51 w-52 p-2 shadow-sm"
          >
            <li>
              <Link
                to={`/profile/${user?._id}`}
                className="flex items-center gap-2"
              >
                <LazyImage
                  className="w-10 h-10 rounded-full object-cover"
                  src={user?.avatar}
                  alt="avatar"
                />
                <h1 className="text-md font-bold">{user?.fullName}</h1>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <Settings className="size-5" /> <span>settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
