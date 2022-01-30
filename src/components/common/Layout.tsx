import { useSession } from "next-auth/react";
import React, { FC } from "react";
import Link from "../ui/Link";
import SelectTheme from "./SelectTheme";
import cn from "classnames";
import Badge from "../ui/Badge";

interface Props {
  className?: string;
}

const Layout: FC<Props> = ({ children, className }) => {
  const { data: session } = useSession();
  return (
    <div className="container flex flex-col min-h-screen p-4 mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <Link href="/" className="hover:decoration-indigo-500">
            qwk.st
          </Link>
          <Badge className="ml-2 text-xs">with subdomain</Badge>
        </div>
        <div className="space-x-4">
          {session?.user ? (
            <>
              <Link href="/profile">profile</Link>
              <Link href="/auth/signout">signout</Link>
            </>
          ) : (
            <Link href="/auth/signin">signin</Link>
          )}
          <SelectTheme />
        </div>
      </header>
      <main className={cn("flex-1", className)}>{children}</main>
      <footer className="space-x-4 text-right">
        <Link href="https://github.com/mxkaske/qwk.st">GitHub</Link>
        <Link href="https://twitter.com/mxkaske">Twitter</Link>
      </footer>
    </div>
  );
};

export default Layout;
