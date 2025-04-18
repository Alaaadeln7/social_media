export default function AddFriendsSkeleton() {
  const printSkeletons = Array.from({ length: 5 }).map((_, idx) => (
    <li className="flex gap-3 items-start p-2 rounded-xl my-2" key={idx}>
      {/* Avatar Skeleton */}
      <div className="w-10 h-10 rounded-full bg-base-200 animate-pulse"></div>

      <div className="flex flex-col items-start flex-1">
        {/* Name Skeleton */}
        <div className="w-32 h-5 bg-base-200 animate-pulse rounded"></div>
        {/* Time Skeleton */}
        <div className="w-16 h-4 bg-base-200 animate-pulse rounded mt-1"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-base-200 animate-pulse rounded"></div>
      </div>
    </li>
  ));

  return <div>{printSkeletons}</div>;
}
