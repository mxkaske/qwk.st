import React, { AnchorHTMLAttributes, FC } from "react";
import { default as NextLink } from "next/link";
import cn from "classnames";
import { ExternalLinkIcon } from "@heroicons/react/outline";

const externalProps = {
  target: "_blank",
  rel: "noreferrer",
};

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Link: FC<Props> = ({ href, className, children, ...props }) => {
  const externalLink = !href.startsWith("/");
  return (
    <NextLink href={href}>
      <a
        href={href}
        className={cn(
          "hover:underline focus:ring-2 focus:ring-indigo-500 rounded",
          externalLink && "inline-flex items-center",
          className
        )}
        {...(externalLink && externalProps)}
        {...props}
      >
        {children}
        {externalLink ? <ExternalLinkIcon className={"h-5 w-5 ml-1"} /> : null}
      </a>
    </NextLink>
  );
};

export default Link;
