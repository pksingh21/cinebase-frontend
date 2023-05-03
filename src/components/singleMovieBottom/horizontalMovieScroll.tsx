import HorizontalScroll from "@/components/horizontalDrawerCard/HorizontalDrawerScroll";
import { Grid, Typography } from "@mui/material";
export default function HorizontalDrawer() {
  return (
    <Grid container alignItems="right">
      <Typography variant="h3" style={{ paddingBottom: "40px" }}>
        Top Billed Cast
      </Typography>
      <HorizontalScroll whatToRender="singleMovieDetails" />
    </Grid>
  );
}
