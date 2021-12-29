import Layout from "@/components/common/Layout";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import React from "react";

const VerifyRequest = () => {
  return (
    <Layout className="flex flex-col items-center justify-center">
      <Heading>Check your Email inbox.</Heading>
      <Text className="text-gray-600 dark:text-gray-400">
        Click on the email verification link to successfully sign in.
      </Text>
    </Layout>
  );
};

export default VerifyRequest;
