import { create, get } from "@/utils/fetch";
import { Link } from "@prisma/client";
import React from "react";
import useSWR from "swr";
import Button from "../ui/Button";
import Input from "../ui/Input";

const LinkForm = () => {
  const { mutate } = useSWR<Link[]>(`/api/links`, get);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          href: { value: string };
          label: { value: string };
        };
        await create(`/api/links`, {
          label: target.label.value,
          href: target.href.value,
        });
        await mutate();
      }}
    >
      <Input name="label" type="text" placeholder="Link label" />
      <Input name="href" type="text" placeholder="Link URL" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LinkForm;
