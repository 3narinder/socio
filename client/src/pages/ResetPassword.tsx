import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CustomButton, Loading, TextInput } from "../components";

interface PasswordResetFormValues {
  email: string;
  password: string;
  NewPassword: string;
}

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>({ mode: "onChange" });

  const onSubmit = async (data: PasswordResetFormValues) => {
    try {
      setIsSubmitting(true);
      // Perform your API call or logic here
      console.log("Submitted data:", data);
    } catch (error: any) {
      setErrMsg(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className="text-ascent-1 text-lg font-semibold">Email Address</p>
        <span className="text-sm text-ascent-2">
          Enter email address used during registration
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-4 flex flex-col gap-5"
        >
          <TextInput
            name="email"
            placeholder="Email@example.com"
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

          {errMsg && (
            <span
              className={`text-sm ${
                errMsg ? "text-[#f64949fe]" : "text-[#2ba150fe]"
              }`}
            >
              {errMsg}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white`}
              title="Submit"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
