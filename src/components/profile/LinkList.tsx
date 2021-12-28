import { get } from "@/utils/fetch";
import { Link as LinkType } from "@prisma/client";
import React from "react";
import useSWR from "swr";
import Link from "../ui/Link";

const LinkList = () => {
  const { data: links, mutate } = useSWR<LinkType[]>(`/api/links`, get);
  return (
    <ul>
      {links?.map((link) => (
        <li key={link.id}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
