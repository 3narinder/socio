import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../components";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(user);

  const { posts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {};
  const handleLikePost = () => {};

  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar />

      <div className="w-full flex gap-2 md:gap-4 lg:gap-4 pb-10 h-full">
        {/* Left */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto mt-4">
          <ProfileCard user={userInfo} />
          <div className="block lg:hidden">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>

        {/* center */}
        <div className="flex-1 mt-4 h-full px-4 flex flex-col gap-6 overflow-y-auto">
          {/* <form
            onSubmit={handleSubmit(handlePostSubmit)}
            className="bg-primary px-4 rounded-lg sticky top-0 "
          >
            <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
              <img
                src={user?.profileUrl || NoProfile}
                alt={user?.email}
                className="w-14 h-14 object-cover rounded-full"
              />

              <TextInput
                type="text"
                placeholder="What's in your mind...?"
                styles="w-full rounded-full py-5"
                name="description"
                register={register("description", {
                  required: "Write something about post",
                })}
                error={errors.description ? errors.description?.message : ""}
              />
            </div>

            {errMsg?.message && (
              <span
                role="aletr"
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                }`}
              >
                {errMsg?.message}
              </span>
            )}

            <div className="flex items-center justify-between py-4">
              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  id="imgUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  data-max-size="5120"
                  accept=".jpg, .png, .jpeg"
                />

                <BiImage />

                <span>Image</span>
              </label>

              <label
                htmlFor="videoUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  id="videoUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  data-max-size="5120"
                  accept=".mp4, .wav"
                />

                <BiSolidVideo />

                <span>Video</span>
              </label>

              <label
                htmlFor="gifUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  id="gifUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  data-max-size="5120"
                  accept=".gif"
                />

                <BiSolidFileGif />

                <span>Gif</span>
              </label>

              {posting ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  title="Post"
                  containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                />
              )}
            </div>
          </form> */}

          {loading ? (
            <Loading />
          ) : posts?.length > 0 ? (
            posts?.map((post) => (
              <PostCard
                key={post?._id}
                user={user}
                post={post}
                deletePost={handleDelete}
                likePost={handleLikePost}
              />
            ))
          ) : (
            <div className=""> </div>
          )}
        </div>

        {/* Right */}
        <div className="hidden mt-4 w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          <FriendsCard friends={userInfo?.friends} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
