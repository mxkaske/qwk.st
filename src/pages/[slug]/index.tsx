import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";
import prisma from "@/lib/prisma";
import Link from "@/components/ui/Link";
import Text from "@/components/ui/Text";
import SelectTheme from "@/components/common/SelectTheme";

const Slug = ({
  user,
  links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="container flex flex-col min-h-screen p-4 mx-auto">
      <header className="self-end">
        <SelectTheme />
      </header>
      <main className="flex flex-col items-center justify-center flex-1">
        <Text>@{user.username}</Text>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.href} className="block">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
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
