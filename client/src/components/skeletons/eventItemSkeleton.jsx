export default function eventItemSkeleton() {
  return (
    <li className="flex items-start gap-3 my-3 animate-pulse">
      <div className="bg-base-300 rounded-full size-5" />
      <div className="flex flex-col items-start gap-1 flex-1">
        <div className="h-4 bg-base-300 rounded w-32" />
        <div className="h-3 bg-base-200 rounded w-52" />
      </div>
    </li>
  );
}
