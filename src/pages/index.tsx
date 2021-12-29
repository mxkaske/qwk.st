import Link from "@/components/ui/Link";
import Layout from "@/components/common/Layout";
import Heading from "@/components/ui/Heading";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://main-ly.vercel.app"
    : "http://localhost:3000";

export default function Home() {
  return (
    <Layout className="flex flex-col items-center justify-center">
      <div className="space-y-6">
        <Heading as="h1" className="max-w-3xl text-center">
          <span className="underline decoration-indigo-500 decoration-4 md:decoration-[6px]">
            Main.ly
          </span>
          , the{" "}
          <a
            href="https://github.com/maximiliankaske/main.ly"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-4 md:decoration-[6px] focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            Open Source
          </a>{" "}
          Alternative to{" "}
          <span className="line-through decoration-green-500 decoration-4 md:decoration-[6px]">
            Linktr.ee
          </span>
        </Heading>
        <Heading as="h4" className="max-w-sm mx-auto text-center">
          Curious about how it looks? Check out{" "}
          <Link href={`${URL}/mxkaske`} className="italic">
            @mxkaske
          </Link>
          .
        </Heading>
      </div>
    </Layout>
  );
}
