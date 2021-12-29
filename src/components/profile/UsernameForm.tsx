import { get, update } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import toasts from "@/lib/toasts";
import Text from "../ui/Text";

// avoid username to be:
const blacklist = ["api", "auth", "404", "profile"];

const UsernameForm = () => {
  const [disabled, setDisabled] = useState(true);
  const { data: session } = useSession();
  const [value, setValue] = useState(session?.user.username ?? "");
  const { data: user } = useSWR<{ username: string } | undefined>(
    value !== "" ? `/api/username/${value}` : null,
    get
  );

  const userExists =
    (user?.username && user.username !== session?.user.username) ||
    blacklist.includes(value);

  useEffect(() => {
    if (userExists || value === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userExists, value]);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            slug: { value: string };
          };
          toasts.promise(
            update(`/api/users/${session.user.id}`, {
              username: target.slug.value,
            })
          );
        }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="">
          <Label htmlFor="slug">Username</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="username"
            value={value}
            onChange={async (e) => {
              setDisabled(true);
              setValue(e.target.value);
            }}
            className="w-full"
            prefix="@"
          />
        </div>
        <div className="self-end">
          <Button
            type="submit"
            disabled={disabled}
            className="w-full md:w-auto"
          >
            Submit
          </Button>
        </div>
      </form>
      <Text className="h-4 mt-1 text-sm italic text-red-500">
        {userExists ? "username is taken" : ""}
      </Text>
    </div>
  );
};

export default UsernameForm;
