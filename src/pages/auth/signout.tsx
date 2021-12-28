import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Text from "@/components/ui/Text";
import Layout from "@/components/common/Layout";

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    signOut();
    router.replace("/");
  }, [router]);
  return (
    <Layout>
      <Text>signing out...</Text>
    </Layout>
  );
};

export default SignOut;
