export default function SidebarChatSkeleton() {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, idx) => (
        <li key={idx} className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse"></div>
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex gap-4 justify-between items-center w-full">
              <div className="w-24 h-4 bg-base-300 rounded animate-pulse"></div>
              <div className="w-10 h-3 bg-base-300 rounded animate-pulse"></div>
            </div>
            <div className="w-36 h-3 bg-base-300 rounded animate-pulse"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}
