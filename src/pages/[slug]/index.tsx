import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import prisma from "@/lib/prisma";
import Link from "@/components/ui/Link";
import Text from "@/components/ui/Text";
import Layout from "@/components/common/Layout";

const Slug = ({
  user,
  links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Text>@{user.username}</Text>
      {links.map((link) => (
        <Link key={link.id} href={link.href} className="block">
          {link.label}
        </Link>
      ))}
    </Layout>
  );
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ slug: string }>
) => {
  const user = await prisma.user.findUnique({
    where: {
      username: ctx.params.slug,
    },
    select: {
      id: true,
      username: true,
    },
  });

  const links = await prisma.link.findMany({
    where: {
      userId: user?.id,
    },
  });

  return {
    notFound: !user,
    props: {
      user,
      links,
    },
  };
};

export default Slug;
