import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Topbar from "@/components/TopBar/topbar";
import { Stack } from "@mui/material";
import MiddleSearchBar from "@/components/middleSearchBar/middleSearchBar";
import HorizontalDrawer from "@/components/horizontalDrawerCard/HorizontalDrawer";
export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  if (session.status === "loading") {
    return <h2>Loading</h2>;
  } else if (session.status === "unauthenticated") {
    router.replace("/auth/login");
  } else {
    return (
      <Stack spacing={2}>
        <Topbar />
        <MiddleSearchBar />
        <HorizontalDrawer />
      </Stack>
    );
  }
}
