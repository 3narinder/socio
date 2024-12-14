import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  CustomButton,
  FriendsCard,
  Loading,
  ProfileCard,
  TextInput,
  TopBar,
  PostCard,
} from "../components";
import { requests, suggest } from "../assets/data";
import { Link, useSubmit } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsPersonAdd } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { BiImage, BiSolidFileGif, BiSolidVideo } from "react-icons/bi";
import EditProfile from "../components/EditProfile";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);

  const { posts } = useSelector((state) => state.posts);

  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (data) => {};

  return (
    <>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <TopBar />

        <div className="w-full flex gap-2 md:gap-4 lg:gap-4 pb-10 h-full">
          {/* Left */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto mt-4">
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* center  */}
          <div className="flex-1 mt-4 h-full px-4 flex flex-col gap-6 overflow-y-auto">
            <form
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
            </form>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  user={user}
                  post={post}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className=""> </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden mt-4 w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            {/* friend requests */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                <span>Friend Requests</span>
                <span>{friendRequest?.length}</span>
              </div>

              <div className="w-full flex-col flex gap-4 pt-4">
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className="flex items-center justify-between">
                    <Link
                      to={`/profile/${from?._id}`}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={from?.profileUrl || NoProfile}
                        alt={from?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />

                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {from?.firstName} {from?.lastName}
                        </p>

                        <span className="text-sm text-ascent-1">
                          {from?.profession || "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <CustomButton
                        title="Accept"
                        containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                      />

                      <CustomButton
                        title="Deny"
                        containerStyles="border border[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* suggested friends */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                <span className="">Friend Suggestions</span>
              </div>

              <div className="w-full flex-col flex gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div
                    key={friend?._id}
                    className="flex items-center justify-between"
                  >
                    <Link
                      to={`/profile/${friend?._id}`}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={friend?.profileUrl || NoProfile}
                        alt={friend?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />

                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {friend?.firstName} {friend?.lastName}
                        </p>

                        <span className="text-sm text-ascent-1">
                          {friend?.profession || "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <button
                        className="bg-[#0444a430] text-sm text-white p-1 rounded"
                        onClick={() => {}}
                      >
                        <BsPersonAdd size={20} className="text-[#0f52b6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default Home;
