import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Topbar from "@/components/TopBar/topbar";
import { Stack } from "@mui/material";
import MiddleSearchBar from "@/components/middleSearchBar/middleSearchBar";
import HorizontalDrawer from "@/components/horizontalDrawerCard/HorizontalDrawer";

export const DrawerTitleContext = React.createContext<string>("Trending");

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const [drawerTitle, setDrawerTitle] = React.useState<string>("Trending");
  const setSearched = () => {
    setDrawerTitle("Search Results");
  };
  //////////console.log(session);
  if (session.status === "loading") {
    return <h2>Loading</h2>;
  } else if (session.status === "unauthenticated") {
    router.replace("/auth/login");
  } else {
    return (
      <DrawerTitleContext.Provider value={drawerTitle}>
        <Stack spacing={2}>
          <Topbar />
          <MiddleSearchBar setSearched={setSearched} />
          <HorizontalDrawer />
        </Stack>
      </DrawerTitleContext.Provider>
    );
  }
}
