import cn from "classnames";
import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
}

const Input = ({ type = "text", prefix, className, ...props }: Props) => {
  if (!prefix) {
    return (
      <input
        className={cn(
          "px-3 py-2 border bg-transparent border-gray-200 hover:border-gray-300 dark:hover:border-gray-600 dark:border-gray-700 rounded focus:ring-2 focus:ring-indigo-500",
          className
        )}
        type={type}
        {...props}
      />
    );
  } else {
    return (
      <div
        className={cn(
          "inline-flex items-center overflow-hidden bg-transparent border border-gray-200 rounded group hover:border-gray-300 dark:hover:border-gray-600 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500",
          className
        )}
      >
        <p className="px-3 py-2 border-r bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          {prefix}
        </p>
        <input
          className="w-full bg-transparent border-0 focus:appearance-none focus:ring-0"
          type={type}
          {...props}
        />
      </div>
    );
  }
};

export default Input;
