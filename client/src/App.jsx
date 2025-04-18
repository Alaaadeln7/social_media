import { Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";
import UpdatePage from "./views/auth/UpdatePage";
import ForgetPassword from "./views/auth/ForgetPassword";
import ProfilePage from "./views/auth/ProfilePage";
import NotFoundPage from "./views/NotFoundPage";
import CodeVerification from "./views/auth/CodeVerification";
import ResetPassword from "./views/auth/ResetPassword";
import Notification from "./views/notification/Notification";
import Chat from "./views/chat/Chat";
import SignupPage from "./views/auth/SignupPage";
import LoginPage from "./views/auth/LoginPage";
import VerificationCodeForgetPassword from "./views/auth/VerificationCodeForgetPassword";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { socketConnection, socketDisconnection } from "./utils/socket";
import useAuth from "./hooks/useAuth";
import SingleChat from "./views/chat/SingleChat";
import SettingsPage from "./views/settings/SettingsPage";
import ChangeChatTheme from "./views/chat/ChangeChatTheme";
import LeftSide from "./views/home/LeftSide";
import Events from "./views/events/Events";
import { Loader } from "lucide-react";

export default function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { user, userLoading } = useAuth();

  useEffect(() => {
    if (user) {
      socketConnection(dispatch, user);
    }
    return () => socketDisconnection(dispatch);
  }, [user, dispatch]);

  // Set theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (userLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <main className="text-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-code" element={<CodeVerification />} />
        <Route
          path="/verify-code-forget-password"
          element={<VerificationCodeForgetPassword />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/events"
          element={
            <>
              <LeftSide />
              <Events />
            </>
          }
        />
        <Route />
        <Route />
        <Route />
        {/* Protected Routes */}
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/update-profile" element={<UpdatePage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/chat/:conversationId" element={<SingleChat />} />
        <Route
          path="/chat/:conversationId/change-theme"
          element={<ChangeChatTheme />}
        />
        <Route path="/chat/*" element={<Chat />} />
        <Route path="/settings/*" element={<SettingsPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </main>
  );
}
