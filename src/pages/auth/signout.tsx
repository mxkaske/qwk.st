import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "@/components/common/Layout";
import Heading from "@/components/ui/Heading";

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    signOut();
    router.replace("/");
  }, [router]);
  return (
    <Layout className="flex flex-col items-center justify-center">
      <Heading>Signing out...</Heading>
    </Layout>
  );
};

export default SignOut;
