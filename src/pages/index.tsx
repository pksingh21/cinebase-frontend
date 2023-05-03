import Image from "next/image";
import { Inter } from "next/font/google";
import { LinearProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/main/main");
    } else if (session.status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [session, router]);
  return (
    <main>
      <LinearProgress />
    </main>
  );
}
