import { get, update } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import toasts from "@/lib/toasts";
import Text from "../ui/Text";
import { useRouter } from "next/router";

// avoid username to be:
const blacklist = ["api", "auth", "404", "profile"];

const UsernameForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [value, setValue] = useState(session?.user.username ?? "");
  const { data: user } = useSWR<{ username: string } | undefined>(
    value !== "" ? `/api/username/${value}` : null,
    get
  );

  const userExists =
    (user?.username && user.username !== session?.user.username) ||
    blacklist.includes(value);

  return (
    <div className="p-3 -mx-3 border rounded dark:border-gray-700">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            slug: { value: string };
          };
          await toasts.promise(
            update(`/api/users/${session.user.id}`, {
              username: target.slug.value,
            })
          );
          router.reload();
        }}
        className="grid h-full gap-4"
      >
        <div>
          <Label htmlFor="slug">Username</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="username"
            value={value}
            onChange={async (e) => setValue(e.target.value)}
            className="w-full"
            prefix="@"
            required
          />
          {userExists ? (
            <Text className="text-sm italic text-red-500">
              username is taken
            </Text>
          ) : null}
        </div>
        <div className="self-end">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UsernameForm;
