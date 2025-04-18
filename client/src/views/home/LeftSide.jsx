import { Link, useLocation } from "react-router-dom";
import CardInfo from "./CardInfo";
import {
  BookMarkedIcon,
  Calendar,
  HomeIcon,
  Image,
  User,
  Video,
} from "lucide-react";
export default function LeftSide() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Feed", icon: <HomeIcon /> },
    { to: "/friends", label: "Friends", icon: <User /> },
    { to: "/events", label: "Events", icon: <Calendar /> },
    { to: "/saved-list", label: "Saved", icon: <BookMarkedIcon /> },
    { to: "/videos", label: "Watch Videos", icon: <Video /> },
    { to: "/photos", label: "Photos", icon: <Image /> },
    { to: "/marketplace", label: "Marketplace", icon: <BookMarkedIcon /> },
  ];
  return (
    <article className="fixed top-0 left-0 h-screen xsm:hidden md:w-4/12 lg:w-3/12 md:flex mt-20 py-5 sm:w-3/12  hidden sm:flex  flex-col m-1">
      <div className="h-full overflow-y-auto custom-scrollbar">
        <CardInfo />
        <div className="routes bg-base-100 p-5 rounded-xl mt-2">
          <ul className="bg-base-200 p-4 rounded-xl">
            {links.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    location.pathname === to
                      ? "bg-blue-600 text-base-100"
                      : "text-base-700 hover:bg-blue-100"
                  }`}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="divider"></div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl uppercase self-start">pages you like</h2>
            <div>
              <ul className="space-y-3 mt-4">
                <li className="flex justify-start items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-xl"
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <Link to={"/"}>ui/ux page</Link>
                </li>
                <li className="flex justify-start items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-xl"
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <Link to={"/"}>development page</Link>
                </li>
                <li className="flex justify-start items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-xl"
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <Link to={"/"}>sound page</Link>
                </li>
              </ul>
              <Link
                to={"/"}
                className="text-gray-400 uppercase underline mt-4 block self-start"
              >
                see more
              </Link>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <ul className="flex justify-center gap-3 flex-wrap">
            <li>
              <Link to={"/"}>privacy policy</Link>
            </li>
            <li>
              <Link to={"/"}>conditions</Link>
            </li>
            <li>
              <Link to={"/"}>cookie policy</Link>
            </li>
            <li>
              <Link to={"/"}>Platform @ 2025</Link>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
