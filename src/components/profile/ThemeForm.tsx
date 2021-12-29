import { get, update } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import Label from "../ui/Label";
import Select from "../ui/Select";
import { User } from "@prisma/client";

const themes = ["default", "edgy"];

const ThemeForm = () => {
  const { data: session } = useSession();
  const { data: user, mutate } = useSWR<User>(
    `/api/users/${session.user.id}`,
    get
  );

  return (
    <form>
      <Label htmlFor="theme">Theme</Label>
      <Select
        id="theme"
        name="theme"
        defaultValue={session?.user.theme || "default"}
        onChange={async (e) => {
          e.preventDefault();
          await update(`/api/users/${session?.user.id}`, {
            theme: e.currentTarget.value,
          });
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
