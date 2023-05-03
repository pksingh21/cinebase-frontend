import { CreditsForMovie } from "@/atoms/atom";
import { CurrentMovie } from "@/atoms/atom";
import HorizontalDrawer from "@/components/singleMovieBottom/horizontalMovieScroll";
import { Credits } from "@/types/types";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
async function getMovieCast(
  currentMovieId: number,
  setMovieCasts: SetterOrUpdater<Credits[]>
) {
  try {
    const queryBody = { movie: currentMovieId };
    const result = await axios.get("/api/credits/getMovieCast", {
      params: queryBody,
    });
    ////////console.log(result.data.results, "alright here we go");
    setMovieCasts(result.data.results);
  } catch (err) {
    ////////console.log(err, "Error while fetching the movie cast");
  }
}
export default function SingleMovieBottom() {
  const [screenWidth, setScreenWidth] = React.useState(0);
  const setMovieCasts = useSetRecoilState(CreditsForMovie);
  const currentMovie = useRecoilValue(CurrentMovie);
  ////////console.log(currentMovie, "Current Movie");
  React.useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    setScreenWidth(window.innerWidth);
    getMovieCast(currentMovie.id, setMovieCasts);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {" "}
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
            paddingTop: "20px",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={900}
            gutterBottom
            color={`white`}
          >
            <HorizontalDrawer />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ paddingLeft: screenWidth >= 900 ? "6vw" : "0vw" }}
          textAlign={screenWidth <= 900 ? "center" : "left"}
        >
          <div style={{ paddingTop: "30px" }}></div>
          <Typography
            variant="h6"
            gutterBottom
            fontStyle={`italic`}
            color={`white`}
            display={`inline`}
          >
            {/* {AllMoviesValue!!.tagline!!} */}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
