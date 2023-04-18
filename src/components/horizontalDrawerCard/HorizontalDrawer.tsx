import { Typography, Grid } from "@mui/material";
import HorizontalScroll from "@/components/horizontalDrawerCard/HorizontalDrawerScroll";
import { styles } from "@/styles/styles";
import { Movies } from "@/atoms/atom";
import { getAllMoviesRequest } from "@/types/types";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
export default function HorizontalDrawer() {
  const [AllMoviesState, setMovieState] = useRecoilState(Movies);
  async function getMovieData() {
    const body: getAllMoviesRequest = {};
    body.limit = 1;
    const result = await axios.get("/api/movies/getAllMovies", {
      params: body,
    });
    setMovieState(result.data.results);
  }
  useEffect(() => {
    if (AllMoviesState.length === 0) {
      getMovieData();
    }
  }, []);
  return (
    <div className="HorizontalDrawerComponent">
      <Grid
        container
        direction="column"
        justifyContent={"left"}
        alignItems="left"
      >
        <Typography variant="h3" style={{paddingBottom:"20px"}} >Trending</Typography>
        <HorizontalScroll />
      </Grid>
    </div>
  );
}
