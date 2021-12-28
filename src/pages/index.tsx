import { useSession } from "next-auth/react";
import Link from "@/components/ui/Link";
import SelectTheme from "@/components/common/SelectTheme";
import Layout from "@/components/common/Layout";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <Layout>
      {isLoading ? null : session?.user ? (
        <Link href="/auth/signout">signout</Link>
      ) : (
        <Link href="/auth/signin">signin</Link>
      )}
    </Layout>
  );
}
