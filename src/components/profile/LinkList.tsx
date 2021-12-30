import toasts from "@/lib/toasts";
import { create, get, update, _delete } from "@/utils/fetch";
import { Link as LinkType } from "@prisma/client";
import React, { FormEvent, useRef } from "react";
import useSWR from "swr";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Text from "../ui/Text";

interface Props {
  fallbackData: LinkType[];
}

const LinkList = ({ fallbackData }: Props) => {
  const { data: links, mutate } = useSWR<LinkType[]>(`/api/links`, get, {
    fallbackData,
  });

  return (
    <div className="grid gap-x-4 gap-y-4 md:gap-x-9 md:grid-cols-2">
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
            await toasts.promise(
              update(`/api/links/${link.id}`, {
                label: target.label.value,
                href: target.href.value,
              })
            );
            await mutate();
          }}
          onDelete={async () => {
            if (confirm("Do you want to delete this?")) {
              await toasts.promise(_delete(`/api/links/${link.id}`));
              await mutate();
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
          await toasts.promise(
            create(`/api/links`, {
              label: target.label.value,
              href: target.href.value,
            })
          );
          await mutate();
        }}
      />
    </div>
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
    <div className="p-3 -mx-3 border rounded dark:border-gray-700">
      <form
        ref={formRef}
        onChange={() => {}}
        onSubmit={async (e) => {
          e.preventDefault();
          await onSubmit(e);
          if (!link) {
            formRef.current?.reset();
          }
        }}
        className="grid gap-4"
      >
        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            name="label"
            placeholder="Website"
            defaultValue={link?.label || ""}
            className="w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="href">URL</Label>
          <Input
            id="href"
            name="href"
            placeholder="https://mywebsite.com"
            defaultValue={link?.href || ""}
            className="w-full"
            required
          />
        </div>
        <div className="grid gap-4 col-span-full md:grid-cols-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
          {link?.id && (
            <Button
              destructive
              onClick={(e) => {
                e.preventDefault(); // otherwise will trigger form submittion
                onDelete();
              }}
              className="w-full"
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LinkList;
