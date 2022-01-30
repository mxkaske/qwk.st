import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  // The full domain with subdomain
  const hostname = req.headers.get("host");

  // The full domain without subdomain
  let domain = "";
  if (process.env.VERCEL_ENV === "production") {
    domain = "qwk.st";
    // avoid vercel sudomain url git-sha.vercel.app in "preview"
  } else if (hostname.includes(".vercel.app")) {
    domain = hostname;
  } else {
    domain = "staging.qwk.st";
  }

  // Either the full domain without subdomain or only the subdomain
  const currentHost =
    process.env.NODE_ENV == "production"
      ? hostname?.replace(`.${domain}`, "")
      : process.env.CURR_HOST;

  console.log({ domain, currentHost, hostname, pathname });

  // Prevent running if-statements if currentHost is invalid.
  if (!currentHost || currentHost === "" || currentHost === domain) {
    console.log("no subdomain");
    return NextResponse.next();
  }

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if (pathname.startsWith(`/_sites`)) {
    console.log("pathname starts with `/_sites`");
    return new Response(null, { status: 404 });
  }

  if (
    !pathname.includes(".") && // exclude all files in the public folder
    !pathname.startsWith("/api") // exclude all API routes
  ) {
    // rewrite to the current hostname under the pages/sites folder
    // the main logic component will happen in pages/sites/[site]/index.tsx
    console.log("with subdomain and valid pathname");
    return NextResponse.rewrite(`/_sites/${currentHost}${pathname}`);
  }
}
