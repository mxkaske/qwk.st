import React, { FC } from "react";
import Link from "../ui/Link";
import SelectTheme from "./SelectTheme";

const Layout: FC = ({ children }) => {
  return (
    <div className="container flex flex-col min-h-screen p-4 mx-auto">
      <header className="flex justify-between w-full">
        <Link href="/">main.ly</Link>
        <SelectTheme />
      </header>
      <main className="flex flex-col items-center justify-center flex-1 h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
