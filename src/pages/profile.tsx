import React from "react";
import Protected from "@/components/common/Protected";
import UsernameForm from "@/components/profile/UsernameForm";
import Layout from "@/components/common/Layout";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "@/components/ui/Link";
import UploadForm from "@/components/profile/UploadForm";
import LinkList from "@/components/profile/LinkList";
import ThemeForm from "@/components/profile/ThemeForm";
// Redirect if first logged in - or if no username

const URL =
  process.env.NODE_ENV === "production"
    ? "https://main-ly.vercel.app"
    : "http://localhost:3000";

const MyUser = ({
  links,
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Protected>
        <div className="py-6 space-y-12">
          <UsernameForm />
          <UploadForm />
          <div className="space-y-3">
            <ThemeForm />
            <Link href={`${URL}/${username}`}>How does it look like?</Link>
          </div>
          <LinkList fallbackData={links} />
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

  console.log({ links });

  return {
    props: {
      links,
      username: session?.user.username,
    },
  };
};

export default MyUser;
