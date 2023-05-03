import { Grid, Typography } from "@mui/material";
import Base from "../breadcrumbs/base";
import getAllGenre from "@/pages/api/genre/getAllGenre";
import React from "react";
import HorizontalDrawer from "@/components/singleMovieBottom/horizontalMovieScroll";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentMovie } from "@/atoms/atom";
export default function SingleMovieBottom() {
  const [screenWidth, setScreenWidth] = React.useState(0);
  const currentMovie = useRecoilValue(CurrentMovie);
  console.log(currentMovie, "Current Movie");
  React.useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    setScreenWidth(window.innerWidth);
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
          <div style={{ paddingTop: "30px" }}>
            <Typography
              variant="h6"
              fontWeight={900}
              gutterBottom
              color={`white`}
              display={`inline`}
            >
              User Review will come here
            </Typography>
          </div>
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
