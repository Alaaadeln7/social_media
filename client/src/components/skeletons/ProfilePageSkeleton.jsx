export default function ProfilePageSkeleton() {
  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="rounded-xl w-[600px] bg-base-300">
          {/* Skeleton Header */}
          <div className="flex items-start gap-3 px-10 py-4">
            <div className="w-20 h-20 bg-base-300 rounded-full animate-pulse"></div>
            <div className="flex flex-col items-start">
              <div className="w-32 h-4 bg-base-300 rounded animate-pulse"></div>
              <div className="w-24 h-3 bg-base-300 rounded mt-2 animate-pulse"></div>
              <div className="w-20 h-3 bg-base-300 rounded mt-2 animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton Overview */}
          <div className="flex justify-between items-start flex-col gap-4 px-10 py-4">
            <h1 className="text-3xl font-bold text-base-100">overview</h1>
            <div className="w-full h-16 bg-base-300 rounded animate-pulse"></div>
            <div className="flex justify-center items-center gap-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center"
                >
                  <h1 className="font-bold text-base-100 text-xl">
                    <div className="w-10 h-6 bg-base-300 rounded animate-pulse"></div>
                  </h1>
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton Friends */}
          <div>
            <header className="flex justify-between items-center px-10">
              <h1 className="text-3xl font-bold text-base-100">friends</h1>
              <button className="btn btn-link">see all</button>
            </header>
            <section className="flex justify-center items-center gap-3 flex-wrap p-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-base-300 rounded-xl animate-pulse"
                ></div>
              ))}
            </section>
          </div>

          {/* Skeleton Posts */}
          <div>
            <header className="flex justify-between items-center px-10">
              <h1 className="text-3xl font-bold text-base-100">posts</h1>
              <button className="btn btn-primary text-white">sort by</button>
            </header>
            <div className="rounded-lg p-3 mt-10">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-32 bg-base-300 rounded mt-4 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
