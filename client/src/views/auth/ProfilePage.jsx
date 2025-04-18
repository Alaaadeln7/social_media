import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Camera, Edit, MoveLeft, Pen } from "lucide-react";

import LazyImage from "../../components/LazyImage";
import Post from "../posts/Post";
import ProfilePageSkeleton from "../../components/skeletons/ProfilePageSkeleton";
import CreateBioModal from "./CreateBioModal";

import useAuth from "../../hooks/useAuth";
import useFriends from "../../hooks/useFriend";
import useCheckLang from "../../hooks/useCheckLang";

import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
} from "../../app/api/authApiSlice";
import { useGetPostsByUserIdQuery } from "../../app/api/postsApiSlice";
import ShowAvatarModal from "./showAvatarModal";

export default function ProfilePage() {
  const [openCreateBioModal, setOpenCreateBioModal] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const { userId } = useParams();

  const { user, navigate, updateProfileImageLoading, handleImageUpload } =
    useAuth();
  const { friends } = useFriends();
  const { checkLangText, langText } = useCheckLang();

  const { data: profileUser, isLoading } = useGetProfileQuery(userId);
  const { data: postsUser } = useGetPostsByUserIdQuery(userId);

  useUpdateProfileImageMutation();

  const profileData = useMemo(() => profileUser?.data?.user, [profileUser]);
  const isUser = user?._id === userId;

  useEffect(() => {
    checkLangText(profileData?.bio);
  }, [profileData?.bio, checkLangText]);

  if (isLoading) return <ProfilePageSkeleton />;

  const renderFriends = friends?.friends?.map(({ _id, fullName, avatar }) => (
    <Link
      key={_id}
      to={`/profile/${_id}`}
      className="flex flex-col items-center gap-2"
    >
      <LazyImage
        src={avatar}
        alt={fullName}
        className="w-20 h-20 rounded-xl object-cover"
      />
      <h1 className="font-semibold text-base-800">{fullName}</h1>
    </Link>
  ));

  const renderPosts = postsUser?.data?.map((post) => (
    <Post key={post._id} post={post} />
  ));

  return (
    <>
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-3xl bg-base-100 shadow-lg rounded-xl p-6">
          {/* Back Button */}
          <button className="btn btn-ghost" onClick={() => navigate("/")}>
            <MoveLeft className="size-5" />
          </button>

          {/* Profile Header */}
          <div className="flex items-start gap-4 mt-2">
            {/* Avatar */}
            <div className="relative">
              <LazyImage
                src={profileData.avatar}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <div className="dropdown dropdown-start">
                <div
                  tabIndex={0}
                  role="button"
                  htmlFor="avatar-upload"
                  className={`absolute bottom-2 -right-17 p-2 rounded-full bg-base-content cursor-pointer transition-all duration-200 hover:scale-105 ${
                    updateProfileImageLoading
                      ? "animate-pulse pointer-events-none"
                      : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    {isUser && (
                      <label htmlFor="avatar-upload">
                        change photo
                        <Camera className="w-5 h-5 text-base-900" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={updateProfileImageLoading}
                        />
                      </label>
                    )}
                  </li>
                  <li>
                    <button onClick={() => setShowAvatar(true)}>
                      show the photo
                    </button>
                  </li>
                </ul>
              </div>
              {/* {isUser && (
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 p-2 rounded-full bg-base-content cursor-pointer transition-all duration-200 hover:scale-105 ${
                    updateProfileImageLoading
                      ? "animate-pulse pointer-events-none"
                      : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={updateProfileImageLoading}
                  />
                </label>
              )} */}
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-base-900">
                {profileData.fullName}
              </h1>
              <p className="text-base-600">@{profileData.username}</p>
              <p className="text-base-500">Location</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-base-900 text-left">
              Overview
            </h1>
            {profileData.bio ? (
              <div className="flex items-center gap-3 mt-2">
                <p
                  className={`leading-relaxed ${
                    langText === "en"
                      ? "text-start font-sans"
                      : "text-end font-bold font-serif"
                  }`}
                >
                  {profileData.bio}
                </p>
                {isUser && (
                  <button
                    className="btn btn-ghost"
                    onClick={() => setOpenCreateBioModal(true)}
                  >
                    <Edit className="size-4" />
                  </button>
                )}
              </div>
            ) : (
              isUser && (
                <button
                  onClick={() => setOpenCreateBioModal(true)}
                  className="btn btn-ghost text-blue-600"
                >
                  Create Bio <Pen className="size-3" />
                </button>
              )
            )}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 text-center gap-4">
            {[
              { label: "Followers", value: profileData.followers.length },
              { label: "Following", value: profileData.following.length },
              { label: "Posts", value: postsUser?.data?.length ?? 0 },
            ].map(({ label, value }) => (
              <div key={label}>
                <h2 className="font-semibold text-base-700">{label}</h2>
                <p className="text-lg font-bold text-base-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Friends */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-base-900">Friends</h1>
            <section className="flex justify-center items-center gap-3 flex-wrap mt-4">
              {renderFriends}
            </section>
          </div>

          {postsUser && (
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
              <div className="rounded-lg p-3 mt-4 bg-gray-100">
                {renderPosts}
              </div>
            </div>
          )}
        </div>
      </div>

      {openCreateBioModal && (
        <CreateBioModal
          bio={profileData.bio}
          setOpenCreateBioModal={setOpenCreateBioModal}
        />
      )}
      {showAvatar && (
        <ShowAvatarModal
          setShowAvatar={setShowAvatar}
          avatar={profileData.avatar}
        />
      )}
    </>
  );
}
