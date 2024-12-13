import React, { ReactNode } from "react";

interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  iconRight?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  containerStyles = "",
  iconRight,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center text-base ${containerStyles}`}
    >
      {title}
      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
