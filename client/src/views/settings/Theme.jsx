import { useDispatch, useSelector } from "react-redux";
import { THEMES } from "../../constants/index";
import { setTheme } from "../../app/themeSlice";

export default function Theme() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((item) => (
            <button
              key={item}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                theme === item ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => dispatch(setTheme(item))}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={item}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
