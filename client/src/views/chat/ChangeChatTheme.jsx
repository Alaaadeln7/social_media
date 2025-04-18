import { ArrowLeft, EllipsisVertical, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setChatTheme } from "../../app/chatSlice";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

export default function ChangeChatTheme() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chageColor, setChangeColor] = useState("");
  return (
    <div>
      <header className="shadow shadow-base-500 flex justify-between items-center lg:px-12 sm:px-4 py-5">
        <div className="flex justify-center items-center gap-2">
          <button className="btn btn-sm btn-ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-xl">change theme</h1>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-sm btn-circle btn-ghost hover:bg-base-300"
          >
            <EllipsisVertical className="size-5" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box bg-base-100 border border-base-200 shadow-md mt-2 p-2 w-52 z-[999]"
          >
            <li>
              <button
                className="text-left"
                onClick={() => {
                  setChangeColor("#0082d8");
                  dispatch(setChatTheme("#0082d8"));
                }}
              >
                reset theme
              </button>
            </li>
          </ul>
        </div>
      </header>
      <div>
        <h1 className="text-md font-semibold flex">change color bubble chat</h1>
        <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
          {COLORS.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setChangeColor(item);
                dispatch(setChatTheme(item));
              }}
              style={{ backgroundColor: item }}
              className="w-20 h-20 rounded-lg cursor-pointer border border-gray-300"
            ></div>
          ))}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3 flex text-start px-3 mt-6">
        Preview
      </h3>
      <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
        <div className="p-4 bg-base-200">
          <div className="max-w-lg mx-auto">
            <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                    A
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Alaa adel</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                        message.isSent ? "bg-primary text-base-100" : ""
                      }`}
                      style={{
                        background: chageColor,
                      }}
                    >
                      <p className="text-sm text-start">{message.content}</p>
                      <p
                        className={`text-[10px] mt-1.5 ${
                          message.isSent
                            ? "text-base-100 text-end"
                            : "text-base-100 text-end"
                        }`}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-base-300 bg-base-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary h-10 min-h-0">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
