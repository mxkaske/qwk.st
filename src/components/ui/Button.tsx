import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "px-3 py-2 rounded border hover:border-gray-300 dark:hover:border-gray-600 dark:border-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
