import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

const Protected: FC = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Declined</p>;
  }

  return <>{children}</>;
};

export default Protected;
