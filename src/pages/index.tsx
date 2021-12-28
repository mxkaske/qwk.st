import { useSession } from "next-auth/react";
import Link from "@/components/ui/Link";
import SelectTheme from "@/components/common/SelectTheme";
import Layout from "@/components/common/Layout";

export default function Home() {
  return (
    <Layout>
      <Link href="/mxkaske">Example @mxkaske</Link>
    </Layout>
  );
}
