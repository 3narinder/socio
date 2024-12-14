import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import { BiImage } from "react-icons/bi";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { UpdateProfile } from "../redux/userSlice";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: { ...user } });

  const onSubmit = async () => {};

  const handleClose = () => {
    dispatch(UpdateProfile(false));
  };

  const handleSelect = (e) => {
    setPicture(e.target.value);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-items-center min-h-screen pt-4s px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-[#000] opacity-70"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-between px-6 pt-5 pb-2">
            <label
              htmlFor="name"
              className="block font-medium text-xl text-ascent-1 text-left"
            >
              Edit Profile
            </label>

            <button className="text-ascent-1" onClick={handleClose}>
              <MdClose size={22} />
            </button>
          </div>

          <form
            className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="firstName"
              placeholder="First Name"
              label="Enter First Name"
              type="text"
              register={register("firstName", {
                required: "First Name is Required",
              })}
              styles="w-full"
              labelStyles="ml-2"
              error={errors.firstName ? errors.firstName?.message : ""}
            />
            <TextInput
              placeholder="Last Name"
              label="Enter Last Name"
              type="text"
              register={register("lastName", {
                required: "Last Name required",
              })}
              styles="w-full"
              labelStyles="ml-2"
              error={errors.lastName ? errors.lastName?.message : ""}
            />

            <TextInput
              placeholder="Profession"
              label="Enter Profession"
              type="text"
              register={register("profession", {
                required: "Profession is required",
              })}
              styles="w-full"
              labelStyles="ml-2"
              error={errors.profession ? errors.profession?.message : ""}
            />

            <TextInput
              placeholder="Location"
              label="Location"
              type="text"
              register={register("location", {
                required: "Location do not match",
              })}
              styles="w-full"
              error={errors.location ? errors.location?.message : ""}
            />

            <label
              htmlFor="imgUpload"
              className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
            >
              <input
                type="file"
                id="imgUpload"
                onChange={(e) => handleSelect(e)}
                className="hidden"
                data-max-size="5120"
                accept=".jpg, .png, .jpeg"
              />

              <BiImage />

              <span>Image</span>
            </label>

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

            <div className="py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]">
              {isSubmitting ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white`}
                  title="Submit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
