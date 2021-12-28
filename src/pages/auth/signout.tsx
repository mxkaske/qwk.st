import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    signOut();
    router.replace("/");
  }, []);
  return <div>signing out...</div>;
};

export default SignOut;
