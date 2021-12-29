import Text from "@/components/ui/Text";
import Link from "@/components/ui/Link";
import React from "react";
import Layout from "@/components/common/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Text>Not Found</Text>
      <Text>Want this to be your username?</Text>
      <Link href="/auth/signin">Sign in now!</Link>
    </Layout>
  );
};

export default NotFound;
