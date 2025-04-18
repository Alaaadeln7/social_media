export default function NotificationsSkeleton() {
  return (
    <ul className="p-4 w-80 dropdown-content menu bg-base-100 rounded-box z-1 shadow-sm">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="w-20 h-6 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      <li className="mb-3">
        <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
      </li>
      <li className="mb-3">
        <div className="h-6 w-2/3 bg-gray-300 rounded animate-pulse"></div>
      </li>
    </ul>
  );
}
