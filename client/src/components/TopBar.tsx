import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { setTheme } from "../redux/themeSlice";
import { Logout } from "../redux/userSlice";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async () => {
    console.log("handle search");
  };

  const handleTheme = () => {
    const themeVal = theme === "light" ? "dark" : "light";

    dispatch(setTheme(themeVal));
  };

  return (
    <div className="topBar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      <Link to="/" className="flex gap-2 items-center">
        <div className="w-full flex gap-2 items-center mb-6">
          <div className="p-2 bg-[#065ad8] rounded text-white">
            <TbSocial />
          </div>
          <span className="text-2xl text-[#065ad8]">SocioFun</span>
        </div>
      </Link>

      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          type="text"
          placeholder="Search..."
          register={register("search")}
          styles="w-[18rem] lg:w-[38rem] rounded-l-full py3"
        />

        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full"
        />
      </form>

      {/* icons */}

      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>

        <div className="hidden lg:flex">
          <IoMdNotifications />
        </div>

        <div className="">
          <CustomButton
            onClick={() => dispatch(Logout())}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
