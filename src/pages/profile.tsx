import React from "react";
import Protected from "@/components/common/Protected";
import UsernameForm from "@/components/profile/UsernameForm";
import Layout from "@/components/common/Layout";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import UploadForm from "@/components/profile/UploadForm";
import LinkList from "@/components/profile/LinkList";
import ThemeForm from "@/components/profile/ThemeForm";
import Heading from "@/components/ui/Heading";

const MyUser = ({
  links,
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Protected>
        <div className="py-6 space-y-12">
          <div>
            <Heading>User</Heading>
            <div className="grid gap-4 md:gap-9 md:grid-cols-2">
              <UsernameForm />
              <UploadForm />
            </div>
          </div>
          <div>
            <Heading>Theme</Heading>
            <div className="grid gap-4 md:gap-9 md:grid-cols-2">
              <ThemeForm />
            </div>
          </div>
          <div>
            <Heading>Links</Heading>
            <LinkList fallbackData={links} />
          </div>
        </div>
      </Protected>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  const links = await prisma.link.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return {
    props: {
      links,
      username: session?.user.username,
    },
  };
};

export default MyUser;
