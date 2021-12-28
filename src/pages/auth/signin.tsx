import React from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Layout from "@/components/common/Layout";

const SignIn = () => {
  return (
    <Layout>
      <Button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Sign in with GitHub
      </Button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            email: { value: string };
          };
          signIn("email", { email: target.email.value, callbackUrl: "/" });
        }}
      >
        <Input
          type="email"
          name="email"
          placeholder="your@company.com"
          required
        />
        <Button type="submit">Sign in with Email</Button>
      </form>
    </Layout>
  );
};

export default SignIn;
