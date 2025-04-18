import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function useIsUserOnline(user) {
  const { onlineUsers } = useSelector((state) => state.user);
  const userIsOnline = useMemo(() => {
    if (!user) return false;
    return onlineUsers?.includes(user._id);
  }, [onlineUsers, user]);
  return { userIsOnline };
}
