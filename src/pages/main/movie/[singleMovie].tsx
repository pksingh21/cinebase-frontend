import Topbar from "@/components/TopBar/topbar";
import { Cast, Movie, getMovieByIdRequest } from "@/types/types";
import { Grid, Stack, Typography, styled } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import SmollMovieCircle from "@/components/RatingSmollCircle/RatingSmollCircle";
import Base from "@/components/breadcrumbs/base";
const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    paddingTop: "65px",
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: "65px",
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: "120px",
  },
  [theme.breakpoints.up("lg")]: {
    paddingTop: "120px",
  },
  [theme.breakpoints.up("xl")]: {
    paddingTop: "120px",
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
function replaceHyphensWithWhiteSpace(inputString: string): string {
  return inputString.replace(/-/g, " ");
}
function DynamicPage() {
  const session = useSession();
  const router = useRouter();
  const [movieCast, setMovieCast] = React.useState<Cast[]>([]);
  const [screenWidth, setScreenWidth] = React.useState(0);
  React.useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    setScreenWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let { singleMovie } = router.query;
  const [title, setTitle] = React.useState("");
  React.useEffect(() => {
    if (router.isReady) {
      // Code using query
      singleMovie = replaceHyphensWithWhiteSpace(singleMovie as string);
      // this will set the state before component is mounted
      setTitle(singleMovie as string);

      getMovieById(
        Math.abs(extractNumbers(router.query.singleMovie as string)!!)
      );
    }
  }, [router.isReady]);
  const [AllMoviesValue, setAllMovieValue] = React.useState<
    Movie | undefined
  >();
  const [MovieLanguage, SetMovieLanugage] = React.useState<string>("");
  async function getMovieById(movId: number) {
    const body: getMovieByIdRequest = { MovieId: movId };
    const result = await axios.get("/api/movies/getMovieById", {
      params: body,
    });
    if (result.status == 200) {
      setAllMovieValue(result.data);
      const baseURL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";
      const movieLanguageCode = result.data.language;
      const body: { languageCode: string } = {
        languageCode: movieLanguageCode,
      };
      try {
        const actualMovieLang = await axios.get(
          "/api/movies/convertCodeToLanguage",
          { params: body }
        );
        const movieCast = await axios.get("/api/movies/getMovieCast", {
          params: { movie: result.data?.id!! },
        });
        console.log(result.data, movieCast.data.results, "Movie Cast");

        SetMovieLanugage(actualMovieLang.data.name);
      } catch (err) {
        SetMovieLanugage(movieLanguageCode);
        console.error(err, "error while fetching movie language");
      }
      setPosterPath(baseURL + result.data.poster_path!!);
    } else {
      //console.log("something went wrong while fetching the movie by id");
    }
  }
  const [posterPath, setPosterPath] = React.useState("");
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
  //console.log(AllMoviesValue, "All Movies Value");
  return (
    <div>
      <Topbar />
      <Grid container justifyContent={"center"} alignItems="center">
        <Grid item xs={12}>
          <Image
            src={posterPath}
            alt="Background Image"
            priority={true}
            fill={false}
            style={{
              zIndex: -2,
              position: "fixed",
              left: 0,
              right: 0,
              filter: "brightness(20%)",
              pointerEvents: "none",
            }}
            width={`1920`}
            height={`1080`}
          />
        </Grid>
      </Grid>
      <Root>
        <Grid
          container
          justifyContent={"center"}
          alignItems="stretch"
          style={{ paddingRight: screenWidth >= 900 ? "25vw" : "0vw" }}
        >
          <Grid
            item
            xs={12}
            md={6}
            style={{
              textAlign: screenWidth <= 900 ? "center" : "right",
            }}
          >
            <Image
              alt="Picture of the Movie"
              src={
                "https://www.themoviedb.org/t/p/w220_and_h330_face" +
                AllMoviesValue!!.poster_path!!
              }
              width={270}
              height={450}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ paddingLeft: screenWidth >= 900 ? "5vw" : "0vw" }}
            textAlign={screenWidth <= 900 ? "center" : "left"}
          >
            <Typography
              variant="h4"
              fontWeight={900}
              gutterBottom
              color={`white`}
            >
              {AllMoviesValue!!.title!!}
            </Typography>
            <Base
              releaseDate={AllMoviesValue!!.release_date}
              language={MovieLanguage}
              runTime={AllMoviesValue!!.runtime!!}
            />
            <div style={{ paddingTop: "30px" }}>
              <Grid container>
                <Grid item xs={1}>
                  <SmollMovieCircle
                    value={AllMoviesValue.cinebase_rating * 10}
                  />
                </Grid>
                <Grid item xs={6} style={{ marginTop: "-10px" }}>
                  <Typography
                    variant="h6"
                    fontWeight={900}
                    gutterBottom
                    color={`white`}
                    display={`inline`}
                  >
                    User Review
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Typography
              variant="h6"
              gutterBottom
              fontStyle={`italic`}
              color={`white`}
              display={`inline`}
            >
              {AllMoviesValue!!.tagline!!}
            </Typography>
            <Typography
              variant="h3"
              gutterBottom
              color={`white`}
              style={{ paddingTop: "20px" }}
            >
              Overview
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              color={`white`}
              display={`inline`}
            >
              {AllMoviesValue!!.overview!!}
            </Typography>
          </Grid>
        </Grid>
      </Root>
    </div>
  );
}

export default DynamicPage;
