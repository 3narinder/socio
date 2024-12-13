import { TbSocial } from "react-icons/tb";
import { CustomButton, Loading, TextInput } from "../components";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginImg } from "../assets";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      setErrMsg(""); // Clear previous error messages if any

      // Simulate an API call or perform the actual API call here
      console.log("Form submitted:", data);
      // const response = await fakeApiCall(data);

      // if (response.success) {
      //   console.log("Login successful!");
      // } else {
      //   throw new Error(response.message || "Login failed");
      // }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during form submission:", error);
        setErrMsg(error.message);
      } else {
        console.error("Unknown error during form submission:", error);
        setErrMsg("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const [errMsg, setErrMsg] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center">
      <div className="w-full h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary overflow-hidden shadow-xl">
        {/* Left */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ad8]">SocioFun</span>
          </div>

          <p className="text-ascent-1 text-base font-semibold">
            Login to your account
          </p>

          <span className="text-sm mt-2 text-ascent-2">Welcome back</span>

          <form
            className="py-8 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="email"
              placeholder="Email@example.com"
              label="Enter email address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              styles="w-full"
              labelStyles="ml-2"
              error={errors.email ? errors.email?.message : ""}
            />

            <TextInput
              name="password"
              placeholder="Password"
              label="Enter Password"
              type="password"
              register={register("password", {
                required: "Password required",
              })}
              styles="w-full"
              labelStyles="ml-2"
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
              to="/reset-password"
              className="text-sm text-right text-blue font-semibold"
            >
              Forgot Password
            </Link>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                }`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white`}
                title="Login"
              />
            )}
          </form>

          <p className="text-ascent-2 text-sm text-center">
            Don't have an account?
            <Link
              to="/register"
              className="font-semibold ml-2 cursor-pointer text-[#065ad8]"
            >
              create and account
            </Link>
          </p>
        </div>

        {/* Right */}
        <div
          className="hidden w-1/2 h-full lg:flex flex-col items-center justify-around py-8 bg-blue"
          style={{
            clipPath: "ellipse(80% 110% at 80% 0%)",
          }}
        >
          <div className="text-center w-full h-1/3">
            <p className="text-white text-base mt-4">
              Connect with friends & have share for fun
            </p>

            <span className="text-sm text-white/80">
              Share memories with friends and the world.
            </span>
          </div>

          <div className="relative w-full h-full mb-20 ml-8 flex justify-center">
            <img
              src={LoginImg}
              alt="background image"
              className="p-10 w-full h-auto z-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
