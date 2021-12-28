import React from "react";
import Protected from "@/components/common/Protected";
import UsernameForm from "@/components/profile/UsernameForm";
import LinkList from "@/components/profile/LinkList";
import LinkForm from "@/components/profile/LinkForm";
import Text from "@/components/ui/Text";
import Layout from "@/components/common/Layout";

// Redirect if first logged in - or if no username

const MyUser = () => {
  return (
    <Layout>
      <Protected>
        <Text>Create your personal slug</Text>
        <UsernameForm />
        <hr />
        <LinkList />
        <hr />
        <LinkForm />
      </Protected>
    </Layout>
  );
};

export default MyUser;
