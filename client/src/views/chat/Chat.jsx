import ChatSidebar from "./ChatSidebar";
import Header from "../header/Header";

export default function Chat() {
  return (
    <div className="mt-20 flex justify-center items-center">
      <Header />
      <div className="bg-base-100 rounded-xl p-4  flex items-center mt-20">
        <ChatSidebar />
      </div>
    </div>
  );
}
