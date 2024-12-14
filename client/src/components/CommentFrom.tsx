import React, { useState } from "react";
import { User } from "../shared/interface";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { NoProfile } from "../assets";

interface CommentFromProps {
  user: User;
  id: string;
  replyAt: string;
  getComments: (id: string) => void;
}

const CommentFrom: React.FC<CommentFromProps> = ({
  user,
  id,
  replyAt,
  getComments,
}) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border-b border-[#66666645]"
    >
      <div className="w-full flex items-center gap-2 py-4">
        <img
          src={user?.profileUrl || NoProfile}
          alt="User Image"
          className="w-10 h-10 rounded-full object-cover"
        />

        <TextInput
          name="comment"
          styles="w-full rounded-full py-3"
          placeholder={replyAt ? `Reply @${replyAt}` : "Comment on this post"}
          register={register("comment", {
            required: "comment can not be empty",
          })}
          error={errors?.comment ? errors.comment?.message : ""}
        />
      </div>

      {errMsg?.message && (
        <span
          role="alert "
          className={`text-sm ${
            errMsg?.status == "failed"
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe mt-0.5]"
          }`}
        >
          {errMsg?.message}
        </span>
      )}

      <div className="flex items-end justify-end pb-2">
        {loading ? (
          <Loading />
        ) : (
          <CustomButton
            type="submit"
            containerStyles={`bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm`}
            title="Submit"
          />
        )}
      </div>
    </form>
  );
};

export default CommentFrom;
