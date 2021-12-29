import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import Loading from "../icon/Loading";

const Protected: FC = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center py-16">
        <Loading className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Protected;
