import Link from "@/components/ui/Link";
import Layout from "@/components/common/Layout";
import Heading from "@/components/ui/Heading";

export default function Home() {
  return (
    <Layout className="flex flex-col items-center justify-center">
      <div className="space-y-6">
        <Heading as="h1" className="text-center">
          <span className="underline decoration-indigo-500 decoration-4 md:decoration-[6px]">
            Main.ly
          </span>
          , an Open Source Alternative to{" "}
          <span className="line-through decoration-green-500 decoration-4 md:decoration-[6px]">
            Linktr.ee
          </span>
        </Heading>
        <Heading as="h3" className="text-center">
          <Link
            href={`${
              process.env.VERCEL_URL || "http://localhost:3000"
            }/mxkaske`}
          >
            Example @mxkaske
          </Link>
        </Heading>
      </div>
    </Layout>
  );
}
