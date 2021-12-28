import { useSession } from "next-auth/react";
import React, { FC } from "react";
import Link from "../ui/Link";
import SelectTheme from "./SelectTheme";

const Layout: FC = ({ children }) => {
  const { data: session } = useSession();
  return (
    <div className="container flex flex-col min-h-screen p-4 mx-auto">
      <header className="flex justify-between">
        <Link href="/">main.ly</Link>
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
      <main className="flex flex-col items-center justify-center flex-1 h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
