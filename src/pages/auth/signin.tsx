import React from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Layout from "@/components/common/Layout";
import Label from "@/components/ui/Label";
import Heading from "@/components/ui/Heading";
import toasts from "@/lib/toasts";

const SignIn = () => {
  return (
    <Layout className="flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
        <Heading className="text-center">Sign in</Heading>
        <Button
          onClick={() => {
            toasts.promise(signIn("github", { callbackUrl: "/profile" }));
          }}
          className="w-full"
        >
          Sign in with GitHub
        </Button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              email: { value: string };
            };
            toasts.promise(
              signIn("email", {
                email: target.email.value,
                callbackUrl: "/profile",
              })
            );
          }}
          className="pt-8 space-y-2"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="your@company.com"
              className="w-full"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send Magic Link
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
