import Link from "@/components/ui/Link";
import Layout from "@/components/common/Layout";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";

export default function Home() {
  return (
    <Layout className="flex flex-col items-center justify-center">
      <div className="space-y-6">
        <Heading as="h1" className="max-w-3xl text-center">
          The{" "}
          <span className="underline decoration-indigo-500 decoration-4 md:decoration-[6px]">
            qwk.st
          </span>{" "}
          <a
            href="https://github.com/maximiliankaske/qwk.st"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-4 md:decoration-[6px] focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            Open Source
          </a>{" "}
          Alternative to{" "}
          <span className="line-through decoration-green-500 decoration-4 md:decoration-[6px]">
            linktr.ee
          </span>
        </Heading>
        <Text className="max-w-sm mx-auto font-medium text-center">
          Curious about how it looks? Check out{" "}
          <Link href="/mxkaske" className="italic font-normal">
            qwk.st/mxkaske
          </Link>{" "}
          or{" "}
          <Link href="https://mxkaske.qwk.st" className="italic font-normal">
            mxkaske.qwk.st
          </Link>
          .
        </Text>
      </div>
    </Layout>
  );
}
