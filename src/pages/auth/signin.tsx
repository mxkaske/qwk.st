import React from "react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div>
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Sign in with GitHub
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            email: { value: string };
          };
          signIn("email", { email: target.email.value, callbackUrl: "/" });
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="your@company.com"
          required
        />
        <button type="submit">Sign in with Email</button>
      </form>
    </div>
  );
};

export default SignIn;
