import React from "react";
import Protected from "@/components/common/Protected";
import UsernameForm from "@/components/profile/UsernameForm";
import Text from "@/components/ui/Text";
import Layout from "@/components/common/Layout";
import LinkTable from "@/components/profile/LinkTable";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "@/components/ui/Link";

// Redirect if first logged in - or if no username

const MyUser = ({
  links,
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Protected>
        <div className="py-6 space-y-6">
          <UsernameForm />
          <div>
            <Link
              href={`${
                process.env.VERCEL_URL || `http://localhost:3000`
              }/${username}`}
            >
              How does it look like?
            </Link>
          </div>
          <LinkTable fallbackData={links} />
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
