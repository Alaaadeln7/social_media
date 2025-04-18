import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useGetNotificationsQuery,
  useMakeAllNotificationsSeenQuery,
  // useMakeNotificationSeenQuery,
} from "../../app/api/notificationsApiSlice";
import NotificationsSkeleton from "../../components/skeletons/NotificationsSkeleton";

export default function NotificationSection() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: notification, isLoading: notificationLoading } =
    useGetNotificationsQuery();
  // const { data } = useMakeNotificationSeenQuery();
  const { refetch: markAllSeen } = useMakeAllNotificationsSeenQuery(undefined, {
    skip: true,
  });

  const handleToggle = async () => {
    if (!isOpen) await markAllSeen();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="bg-base-200 p-2 rounded-lg relative"
      >
        <Bell className="size-5" />
        {notification?.data?.content?.some((item) => !item.seen) && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-base-100 rounded-box shadow-md z-50">
          {notificationLoading ? (
            <NotificationsSkeleton />
          ) : (
            <>
              <div className="flex justify-between px-3 py-2 border-b">
                <Link to="/notification" className="btn btn-link p-0 text-sm">
                  Show all
                </Link>
                <button
                  className="btn btn-link p-0 text-sm"
                  onClick={markAllSeen}
                >
                  Mark all seen
                </button>
              </div>

              <ul className="max-h-80 overflow-y-auto">
                {notification?.data?.content?.length === 0 ? (
                  <li className="text-center text-sm py-2">No notifications</li>
                ) : (
                  notification.data.content.map((notif) => (
                    <li
                      key={notif._id}
                      className={`btn btn-ghost justify-start text-sm text-left whitespace-normal w-full ${
                        !notif.seen ? "bg-base-200" : ""
                      }`}
                    >
                      {notif.text}
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
