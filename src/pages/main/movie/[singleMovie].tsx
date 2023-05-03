import { AllGenre, CurrentMovie } from "@/atoms/atom";
import SmollMovieCircle from "@/components/RatingSmollCircle/RatingSmollCircle";
import Topbar from "@/components/TopBar/topbar";
import Base from "@/components/breadcrumbs/base";
import SingleMovieBottom from "@/components/singleMovieBottom/singleMovieBottom";
import { Movie, genres, getMovieByIdRequest } from "@/types/types";
import { Grid, Typography, styled } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import MovieReview from "@/components/MovieReview/MovieReview";
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
function getAllGenre(setGenre: SetterOrUpdater<genres[]>) {
  async function getGenre() {
    const reqBody = { limit: 21 };
    const result = await axios.get("/api/genre/getAllGenre", {
      params: reqBody,
    });
    if (result.status == 200) {
      setGenre(result.data.results);
      // ////////console.log(result.data.results, "All Genre");
    } else {
      ////////console.log("something went wrong while fetching the movie by id");
    }
  }
  getGenre();
}
function DynamicPage() {
  const session = useSession();
  const router = useRouter();
  const [screenWidth, setScreenWidth] = React.useState(0);
  const setGenre = useSetRecoilState(AllGenre);
  const FinalGenre = useRecoilValue(AllGenre);
  const [genreForMovie, setGenreForMovie] = React.useState<genres[]>([]);
  React.useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    setScreenWidth(window.innerWidth);
    getAllGenre(setGenre);
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
  }, [router.isReady, FinalGenre]);
  const [AllMoviesValue, setAllMovieValue] = React.useState<
    Movie | undefined
  >();
  const setCurrentMovie = useSetRecoilState(CurrentMovie);
  const [MovieLanguage, SetMovieLanugage] = React.useState<string>("");
  async function getMovieById(movId: number) {
    const body: getMovieByIdRequest = { MovieId: movId };
    const result = await axios.get("/api/movies/getMovieById", {
      params: body,
    });
    if (result.status == 200) {
      setAllMovieValue(result.data);
      setCurrentMovie(result.data);
      const baseURL = "https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces";
      const movieLanguageCode = result.data.language;
      const body: { languageCode: string } = {
        languageCode: movieLanguageCode,
      };
      try {
        const actualMovieLang = await axios.get(
          "/api/movies/convertCodeToLanguage",
          { params: body }
        );
        SetMovieLanugage(actualMovieLang.data.name);
        const genresId = result.data.genres as number[];
        let x = [] as genres[];
        for (let i = 0; i < genresId.length; i++) {
          if (FinalGenre.length > 0) x.push(FinalGenre[genresId[i] - 1]);
        }
        setGenreForMovie(x);
      } catch (err) {
        SetMovieLanugage(movieLanguageCode);
        console.error(err, "error while fetching movie language");
      }
      setPosterPath(baseURL + result.data.poster_path!!);
    } else {
      ////////console.log("something went wrong while fetching the movie by id");
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
  //////////console.log(AllMoviesValue, "All Movies Value");
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
              // genres={genreForMovie}
            />
            <div style={{ paddingTop: "30px" }}>
              <Grid container>
                <Grid item xs={1}>
                  <SmollMovieCircle
                    value={AllMoviesValue.cinebase_rating * 10}
                  />
                </Grid>
                <Grid item xs={6} style={{ marginTop: "-10px" }}></Grid>
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
            <div style={{ paddingTop: "20px" }}>
              <Base genres={genreForMovie} />
            </div>
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
        <SingleMovieBottom />
        <MovieReview />
      </Root>
    </div>
  );
}

export default DynamicPage;
