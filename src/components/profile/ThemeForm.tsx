import { get, update } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import Label from "../ui/Label";
import Select from "../ui/Select";
import { User } from "@prisma/client";
import themes from "@/config/themes";
import toasts from "@/lib/toasts";
import Link from "../ui/Link";
import Text from "../ui/Text";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://main-ly.vercel.app"
    : "http://localhost:3000";

const ThemeForm = () => {
  const { data: session } = useSession();
  const { mutate } = useSWR<User>(`/api/users/${session.user.id}`, get);

  return (
    <div className="p-3 -mx-3 border rounded dark:border-gray-700">
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
          <option key={theme} value={theme} label={theme}>
            {theme}
          </option>
        ))}
      </Select>
      {session?.user.theme && (
        <Text className="mt-3 text-gray-600 dark:text-gray-400">
          Get an idea of how others see{" "}
          <Link
            href={`${URL}/${session?.user?.username}`}
            className="text-gray-900 dark:text-white"
          >
            my page
          </Link>
          .
        </Text>
      )}
    </div>
  );
};

export default ThemeForm;
