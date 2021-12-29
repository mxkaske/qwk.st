import { DefaultSeoProps } from "next-seo";

const SEO: DefaultSeoProps = {
  title: "Main.ly",
  description: "The Open Source Alternative to Linktr.ee",
  openGraph: {
    type: "website",
    url: "https://main.ly",
    site_name: "main.ly",
    images: [
      {
        url: "/assets/default-meta.png",
        width: 1200,
        height: 600,
        alt: "main.ly",
      },
    ],
  },
};

export default SEO;
