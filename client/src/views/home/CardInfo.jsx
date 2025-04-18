import { Check } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import LazyImage from "../../components/LazyImage";
export default function CardInfo() {
  const { user } = useAuth();

  return (
    <article className="bg-base-100 rounded-lg py-2">
      <div className="bg-base-200 m-3 p-2 rounded-xl">
        <div className="flex gap-3 items-start">
          <LazyImage
            className="w-10 h-10 rounded-full object-cover"
            src={user?.avatar}
            alt={user?.username}
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-md flex items-center gap-2">
              {user?.fullName}
              <h1
                style={{
                  clipPath:
                    "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
                }}
                className="text-white bg-blue-600 p-1"
              >
                <Check className="size-3" />
              </h1>
            </h1>
            <p>@{user?.username}</p>
          </div>
        </div>
        <div className="flex justify-between px-5 items-center flex-wrap mt-5">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-md">{user?.followers.length}</h1>
            <p>followers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-md">{user?.following.length}</h1>
            <p>following</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-md">2.3k</h1>
            <p>posts</p>
          </div>
        </div>
      </div>
    </article>
  );
}
