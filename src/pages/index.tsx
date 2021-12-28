import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status == "loading") return "loading...";

  return (
    <div className="container flex items-center justify-center min-h-screen p-4 mx-auto">
      <main>
        {session?.user ? (
          <Link href="/auth/signout">signout</Link>
        ) : (
          <Link href="/auth/signin">signin</Link>
        )}
      </main>
    </div>
  );
}
