import cn from "classnames";
import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {}

const Text: FC<Props> = ({ className, children, ...props }) => {
  return (
    <p className={cn("mb-1", className)} {...props}>
      {children}
    </p>
  );
};

export default Text;
