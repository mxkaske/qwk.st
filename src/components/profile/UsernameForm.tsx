import { get, update } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../ui/Button";
import Input from "../ui/Input";

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

  useEffect(() => {
    if (user?.username || value === "" || blacklist.includes(value)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user, value]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          username: { value: string };
        };
        await update(`/api/users/${session.user.id}`, {
          username: target.username.value,
        });
      }}
    >
      <Input
        name="username"
        placeholder="username"
        value={value}
        onChange={async (e) => {
          setDisabled(true);
          setValue(e.target.value);
        }}
      />
      <Button type="submit" disabled={disabled}>
        Submit
      </Button>
    </form>
  );
};

export default UsernameForm;
