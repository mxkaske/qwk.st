import Layout from "@/components/common/Layout";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Link from "@/components/ui/Link";
import React from "react";

const Error = () => {
  return (
    <Layout className="flex flex-col items-center justify-center">
      <Heading>Something went wrong.</Heading>
      <Text className="text-gray-600 dark:text-gray-400">
        Make sure to use the same Provider as your first sign in.
      </Text>
      <Link href="/auth/signin">Retry</Link>
    </Layout>
  );
};

export default Error;
