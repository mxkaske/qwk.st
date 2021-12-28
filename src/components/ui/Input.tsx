import cn from "classnames";
import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ type = "text", className, ...props }: Props) => {
  return (
    <input
      className={cn(
        "px-3 py-2 border bg-transparent border-gray-200 hover:border-gray-300 dark:hover:border-gray-600 dark:border-gray-700 rounded",
        className
      )}
      type={type}
      {...props}
    />
  );
};

export default Input;
