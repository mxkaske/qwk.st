import { create, get, update, _delete } from "@/utils/fetch";
import { Link as LinkType } from "@prisma/client";
import React, { FormEvent, useRef } from "react";
import useSWR from "swr";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Text from "../ui/Text";

interface Props {
  fallbackData: LinkType[];
}

const LinkList = ({ fallbackData }: Props) => {
  const { data: links, mutate } = useSWR<LinkType[]>(`/api/links`, get, {
    fallbackData,
  });

  return (
    <ul className="space-y-3">
      <div className="grid gap-4 font-medium text-gray-600 md:grid-cols-3 dark:text-gray-400">
        <Text>Label</Text>
        <Text>URL</Text>
      </div>
      {links?.map((link) => (
        <Row
          key={link.id}
          link={link}
          onSubmit={async (e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              href: { value: string };
              label: { value: string };
            };
            await update(`/api/links/${link.id}`, {
              label: target.label.value,
              href: target.href.value,
            });
            await mutate();
          }}
          onDelete={async () => {
            const res = confirm("Do you want to delete this?");
            if (res) {
              await _delete(`/api/links/${link.id}`);
              mutate();
            }
          }}
        />
      ))}
      <Row
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
      />
    </ul>
  );
};

interface RowProps {
  link?: LinkType;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onDelete?: () => void;
}

const Row = ({ link, onSubmit, onDelete }: RowProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      onChange={() => {}}
      onSubmit={async (e) => {
        await onSubmit(e);
        if (!link) {
          formRef.current?.reset();
        }
      }}
      className="grid gap-4 md:grid-cols-3"
    >
      <Input
        name="label"
        placeholder="Label"
        defaultValue={link?.label || ""}
        required
      />
      <Input
        name="href"
        placeholder="URL"
        defaultValue={link?.href || ""}
        required
      />
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
        <Button type="submit">Submit</Button>
        {link?.id && (
          <Button destructive onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};

export default LinkList;
