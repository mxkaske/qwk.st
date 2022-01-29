import { DefaultSeoProps } from "next-seo";

const SEO: DefaultSeoProps = {
  title: "qwk.st",
  description: "The Open Source Alternative to Linktr.ee",
  openGraph: {
    type: "website",
    url: "https://qwk.st",
    site_name: "qwk.st",
    images: [
      {
        url: "/assets/default-meta.png",
        width: 1200,
        height: 600,
        alt: "qwk.st",
      },
    ],
  },
};

export default SEO;
