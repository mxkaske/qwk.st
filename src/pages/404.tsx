import Text from "@/components/ui/Text";
import Link from "@/components/ui/Link";
import React from "react";
import Layout from "@/components/common/Layout";
import Heading from "@/components/ui/Heading";

const NotFound = () => {
  return (
    <Layout className="flex flex-col items-center justify-center text-center">
      <Heading as="h1">Not Found</Heading>
      <div>
        <Text className="text-gray-600 dark:text-gray-400">
          Want this to be your username?
        </Text>
        <Link href="/auth/signin">Sign in now</Link>
      </div>
    </Layout>
  );
};

export default NotFound;
