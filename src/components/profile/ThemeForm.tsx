import { get, update } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import Label from "../ui/Label";
import Select from "../ui/Select";
import { User } from "@prisma/client";
import themes from "@/config/themes";
import toasts from "@/lib/toasts";

const ThemeForm = () => {
  const { data: session } = useSession();
  const { mutate } = useSWR<User>(`/api/users/${session.user.id}`, get);

  return (
    <form>
      <Label htmlFor="theme">Theme</Label>
      <Select
        id="theme"
        name="theme"
        defaultValue={session?.user.theme || "default"}
        onChange={async (e) => {
          e.preventDefault();
          toasts.promise(
            update(`/api/users/${session?.user.id}`, {
              theme: e.currentTarget.value,
            })
          );
          mutate();
        }}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme} label={theme} />
        ))}
      </Select>
    </form>
  );
};

export default ThemeForm;
