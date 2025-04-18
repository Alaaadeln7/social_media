import LazyImage from "../../components/LazyImage";
import avatar from "../../assets/avatar.jpg";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Notification() {
  const navigate = useNavigate();
  const printNotifications = [1, 2, 3, 4, 5, 6, 7].map((notification) => (
    <>
      <li key={notification} className="flex gap-3 items-start">
        <LazyImage
          className="w-10 h-10 rounded-full object-cover"
          src={avatar}
          alt="avatar"
        />
        <div className="flex flex-col items-start">
          <h1 className="font-semibold text-base-100 text-xl line-clamp-1">
            Ahmed sent you a friend request
          </h1>
          <p>3m ago</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-red-600"></div>
      </li>
    </>
  ));
  return (
    <section className="flex justify-center items-center">
      <div className="bg-white rounded-xl p-10">
        <header className="flex justify-between items-center flex-col gap-5">
          <div className="flex flex-col items-start">
            {/* <button className="btn btn-error text-white"><MoveLeft className="size-5" /></button> */}
            <h1 className="text-base-100 text-xl font-bold flex items-center gap-2">
              {" "}
              <button
                onClick={() => navigate(-1)}
                className="btn btn-ghost m-0 p-0"
              >
                <MoveLeft className="size-5" />
              </button>{" "}
              Notifications
            </h1>
            <p>stay updated with your Lastest Notifications</p>
          </div>
          <ul className="flex justify-center gap-4 items-center w-full">
            <li>all</li>
            <li>unread</li>
            <li>
              <button className="btn btn-ghost m-0 p-0 text-blue-600">
                Mark all as read
              </button>
            </li>
          </ul>
        </header>
        <div>
          <ul className="flex flex-col gap-4">{printNotifications}</ul>
        </div>
      </div>
    </section>
  );
}
