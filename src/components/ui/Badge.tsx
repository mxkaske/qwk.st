import React, { FC } from "react";
import cn from "classnames";

const Badge: FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
