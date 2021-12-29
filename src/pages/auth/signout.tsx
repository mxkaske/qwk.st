import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Layout from "@/components/common/Layout";
import Heading from "@/components/ui/Heading";
import { useRouter } from "next/router";

const SignOut = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      signOut();
      router.replace("/");
    }
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <Layout className="flex flex-col items-center justify-center">
      <Heading>Signing out...</Heading>
    </Layout>
  );
};

export default SignOut;
