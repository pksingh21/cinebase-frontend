import Topbar from "@/components/TopBar/topbar";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Image from "next/image";
import { styles } from "@/styles/styles";
import { styled } from "@mui/material";
import { red, green, blue } from "@mui/material/colors";
import { useRecoilState, useRecoilValue } from "recoil";
import { Movies } from "@/atoms/atom";
import React from "react";
import { useSession } from "next-auth/react";
import { Paper } from "@mui/material";
import { Movie, getMovieByIdRequest } from "@/types/types";
import axios from "axios";
const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginTop: "20px",
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(2),
  },
  [theme.breakpoints.up("lg")]: {
    marginTop: "120px",
  },
}));
export function extractNumbers(str: string): number | null {
  const match = str.match(/\d+$/);
  return match ? parseInt(match[0], 10) : null;
}
export function extractBaseUrl(url: string): string {
  const pattern = /https?:\/\/[\w\d\.]+\/t\/p\//;
  const match = url.match(pattern);
  if (match) {
    return match[0];
  }
  return "";
}
export function extractFileName(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

function DynamicPage() {
  const session = useSession();
  const router = useRouter();
  const size = "w1920_and_h600_multi_faces_filter(duotone,d80c0c,ffff00)";
  const { singleMovie } = router.query;
  console.log(singleMovie, "single movie");
  const [title, setTitle] = React.useState("");
  React.useEffect(() => {
    if (router.isReady) {
      // Code using query
      console.log(router.query, "inside use effect for router is ready boy");
      // this will set the state before component is mounted
      setTitle(router.query.singleMovie as string);

      getMovieById(
        Math.abs(extractNumbers(router.query.singleMovie as string)!!)
      );
    }
  }, [router.isReady]);
  const [AllMoviesValue, setAllMovieValue] = React.useState<
    Movie | undefined
  >();
  console.log(AllMoviesValue, "All Movies Value");
  async function getMovieById(movId: number) {
    const body: getMovieByIdRequest = { MovieId: movId };
    const result = await axios.get("/api/movies/getMovieById", {
      params: body,
    });
    if (result.status == 200) {
      setAllMovieValue(result.data);
      console.log(result.data);
      setPosterPath(
        extractBaseUrl(result.data.poster_path) +
          size +
          "/" +
          extractFileName(result.data.poster_path)
      );
    } else {
      console.log("something went wrong while fetching the movie by id");
    }
  }
  const [posterPath, setPosterPath] = React.useState("");
  console.log("hu");
  if (
    session.status === "loading" ||
    AllMoviesValue === undefined ||
    !router.isReady
  ) {
    return <h2>Loading</h2>;
  } else if (session.status === "unauthenticated") {
    router.replace("/auth/login");
    return;
  }
  return (
    <div>
      <Topbar />
      <Root>
        <Grid container justifyContent={"center"} alignItems="center">
          <Image
            src={posterPath}
            alt="Background Image"
            priority={true}
            fill={false}
            style={{ zIndex: -2, position: "fixed" }}
            width={`1920`}
            height={`600`}
          />
          <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
            <Image
              alt="Picture of the Movie"
              src={AllMoviesValue!!.poster_path!!}
              width={270}
              height={450}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
            <h1>{singleMovie}</h1>
          </Grid>
        </Grid>
      </Root>
    </div>
  );
}

export default DynamicPage;
