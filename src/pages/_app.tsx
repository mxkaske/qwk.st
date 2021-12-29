import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/index.css";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import SEO from "@/config/next-seo";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
