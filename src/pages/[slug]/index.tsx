import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";
import prisma from "@/lib/prisma";
import Link from "@/components/ui/Link";
import Text from "@/components/ui/Text";
import SelectTheme from "@/components/common/SelectTheme";
import Image from "next/image";
import cn from "classnames";

const Slug = ({
  user,
  links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="container flex flex-col min-h-screen p-4 mx-auto">
      <header className="self-end">
        <SelectTheme />
      </header>
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-xl mx-auto space-y-6">
        <div className="space-y-4">
          <div className="relative w-32 h-32 overflow-hidden bg-gray-500 rounded-full">
            {user.image && (
              <Image
                src={user.image}
                objectFit="cover"
                layout="fill"
                alt={`${user.username} profile image`}
              />
            )}
          </div>
          <Text className="italic font-medium text-center">
            @{user.username}
          </Text>
        </div>
        <ul className="w-full space-y-4">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "block w-full px-3 py-2 text-center border dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
                  {
                    rounded: user.theme === "default",
                    "rounded-full": user.theme === "rounded",
                  }
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <footer className="text-center">
        <Link href="/" className="text-xs">
          Claim your <span className="italic font-medium">@username</span>
        </Link>
      </footer>
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
      image: true,
      theme: true,
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
