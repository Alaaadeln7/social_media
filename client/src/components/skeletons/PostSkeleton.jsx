const PostSkeleton = () => {
  return (
    <article className="bg-base-100 p-3 rounded-xl my-3 w-full shadow animate-pulse">
      {/* Header Skeleton */}
      <header className="flex justify-between items-center px-2 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-base-200 rounded-full"></div>
          <div className="flex flex-col">
            <div className="w-24 h-4 bg-base-200 rounded"></div>
            <div className="w-16 h-3 bg-base-200 rounded mt-1"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-base-200 rounded-full"></div>
      </header>

      {/* Post Image Skeleton */}
      <div className="w-full h-64 bg-base-200 rounded-lg"></div>

      {/* Post Actions Skeleton */}
      <div className="divider m-0"></div>
      <div className="px-3 flex justify-between">
        <ul className="flex justify-center items-center gap-4">
          <li>
            <div className="w-12 h-6 bg-base-100 rounded"></div>
          </li>
          <li>
            <div className="w-12 h-6 bg-base-100 rounded"></div>
          </li>
        </ul>
        <div className="w-8 h-8 bg-base-100 rounded-full"></div>
      </div>
    </article>
  );
};

export default PostSkeleton;
