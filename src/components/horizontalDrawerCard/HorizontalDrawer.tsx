import { Typography, Grid } from "@mui/material";
import HorizontalScroll from "@/components/horizontalDrawerCard/HorizontalDrawerScroll";
import { styles } from "@/styles/styles";
export default function HorizontalDrawer() {
  return (
    <div className="HorizontalDrawerComponent">
      <Grid
        container
        direction="column"
        justifyContent={"left"}
        alignItems="left"
        style={{}}
      >
        <Typography variant="h3">Trending</Typography>
        <HorizontalScroll />
      </Grid>
    </div>
  );
}
