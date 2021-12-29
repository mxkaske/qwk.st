import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean;
}

const Button: FC<Props> = ({
  className,
  disabled,
  destructive = false,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-3 py-2 rounded border dark:border-gray-700 focus:appearance-none focus:ring-2 focus:ring-indigo-500",
        {
          "hover:border-gray-300 dark:hover:border-gray-600": !disabled,
          "bg-gray-50 dark:bg-gray-800": !destructive,
          "text-white bg-red-500": destructive,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
