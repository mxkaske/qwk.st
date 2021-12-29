import { create, get, update, _delete } from "@/utils/fetch";
import { Link } from "@prisma/client";
import React, { FormEvent, useRef, useState } from "react";
import useSWR from "swr";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Text from "../ui/Text";

interface Props {
  fallbackData: Link[];
}

const LinkTable = ({ fallbackData }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: links, mutate } = useSWR<Link[]>(`/api/links`, get, {
    fallbackData,
  });

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border dark:border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-medium tracking-wider text-left uppercase"
                  >
                    <Text className="text-gray-600 dark:text-gray-300">
                      Label
                    </Text>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-medium tracking-wider text-left uppercase"
                  >
                    <Text className="text-gray-600 dark:text-gray-300">
                      Url
                    </Text>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {links?.map((link) => (
                  <LinkTableRow
                    key={link.id}
                    link={link}
                    onDelete={async () => {
                      const res = confirm("Do you want to delete this?");
                      if (res) {
                        await _delete(`/api/links/${link.id}`);
                        mutate();
                      }
                    }}
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
                  />
                ))}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <form
                        ref={formRef}
                        id="link-form"
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
                          formRef.current.reset();
                        }}
                      >
                        <Input
                          name="label"
                          placeholder="Link label"
                          className="-mx-3"
                          required
                        />
                      </form>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Input
                      form="link-form"
                      name="href"
                      placeholder="Link URL"
                      className="-mx-3"
                      required
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-right whitespace-nowrap">
                    <Button form="link-form" type="submit">
                      Submit
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LinkTableRowProps {
  link: Link;
  onDelete: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const LinkTableRow = ({ link, onDelete, onSubmit }: LinkTableRowProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [edit, setEdit] = useState(false);
  // instead of whitespace-nowrap, line-clamp-1

  if (edit) {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <form
              ref={formRef}
              id={`link-form-${link.id}`}
              onSubmit={async (e) => {
                await onSubmit(e);
                setEdit(false);
              }}
            >
              <Input
                name="label"
                placeholder="Link label"
                defaultValue={link.label}
                className="-mx-3"
                required
              />
            </form>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Input
            form={`link-form-${link.id}`}
            name="href"
            placeholder="Link URL"
            defaultValue={link.href}
            className="-mx-3"
            required
          />
        </td>
        <td className="px-6 py-4 font-medium text-right whitespace-nowrap">
          <Button form={`link-form-${link.id}`} type="submit">
            Submit
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <tr key={link.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Text>{link.label}</Text>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Text className="text-gray-600 dark:text-gray-400">{link.href}</Text>
      </td>
      <td className="px-6 py-4 space-x-2 font-medium text-right whitespace-nowrap">
        <Button destructive onClick={onDelete}>
          Delete
        </Button>
        <Button onClick={() => setEdit(true)}>Edit</Button>
      </td>
    </tr>
  );
};

export default LinkTable;
