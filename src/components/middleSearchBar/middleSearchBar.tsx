import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Stack, Typography } from "@mui/material";
import { styles } from "@/styles/styles";
import Image from "next/image";
import { GetServerSideProps } from "next";
type Props = {
  randomNumber: number;
};
export default function CustomizedInputBase() {
  const min = 1;
  const max = 4;
  const [newRandom, setNewRandom] = React.useState(0);
  React.useMemo(() => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNewRandom(randomNumber);
  }, [max, min]);
  //////////console.log(newRandom);
  return (
    <Grid
      container
      direction="column"
      justifyContent={"center"}
      alignItems="center"
      style={styles.paperContainer}
    >
      <Image
        src={`/assets/searchbarbg${newRandom}.jpg`}
        alt="Background Image"
        priority={true}
        fill={false}
        style={{ zIndex: -2, position: "fixed" }}
        width={`1920`}
        height={`620`}
      />

      <Grid item>
        <Stack>
          <Typography variant="h2" fontWeight={900} color={`black`}>
            Welcome.
          </Typography>
          <Typography variant="h4" fontWeight={900} color={`black`}>
            Millions of movies, TV shows and people to discover. Explore now.
          </Typography>
          <Paper
            style={{
              padding: "4px",
              marginTop: "50px",
              display: "flex",
              alignItems: "center",
              width: "80vw",
              borderRadius: "30px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              fullWidth={true}
              placeholder="Search Movies, TV Shows, Celebrities, etc."
              inputProps={{ "aria-label": "search bar movies" }}
              style={{
                padding: "10px",
                height: "46px",
                lineHeight: "46px",
                fontSize: "1.5em",
                color: "rgba(0,0,0,0.5)",
              }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
}
