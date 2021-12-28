import React, { FC, LabelHTMLAttributes } from "react";
import cn from "classnames";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label: FC<Props> = ({ children, className, ...props }) => {
  return (
    <label
      className={cn("font-medium text-gray-600 dark:text-gray-400", className)}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
