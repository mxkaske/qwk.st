import React, { FC, SelectHTMLAttributes } from "react";
import cn from "classnames";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select: FC<SelectProps> = ({ children, className, ...props }) => {
  return (
    <select
      className={cn(
        "bg-transparent border-gray-200 hover:border-gray-300 dark:hover:border-gray-600 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
