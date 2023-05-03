import type { Movie } from "@/types/types";
import type { MovieHitData } from "@/pages/api/discover/movie";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Stack, Typography } from "@mui/material";
import { styles } from "@/styles/styles";
import { Movies } from "@/atoms/atom";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { GetServerSideProps } from "next";
import apiInstance from "@/services/apiInstance";
type Props = {
  setSearched?: () => void;
};
export default function CustomizedInputBase({ setSearched }: Props) {
  const min = 1;
  const max = 4;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [newRandom, setNewRandom] = React.useState(0);
  const [_, setMovies] = useRecoilState(Movies);
  React.useMemo(() => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNewRandom(randomNumber);
  }, [max, min]);

  const handleSearch = async () => {
    try {
      const res = await apiInstance.get<MovieHitData>("/discover/movie", {
        params: {
          query: searchTerm,
        },
      });
      const hits = res.data.results;
      const movieDetails = await Promise.all(
        hits.map((hit) =>
          apiInstance
            .get<Movie>("/movies/getMovieById", {
              params: { MovieId: hit.id },
            })
            .then((res) => res.data)
        )
      );
      setMovies(movieDetails);
      setSearched && setSearched();
    } catch (e) {
      console.error("======= Search failed =======");
      console.error(e);
    }
  };

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
              placeholder="Search Movies"
              inputProps={{ "aria-label": "search bar movies" }}
              style={{
                padding: "10px",
                height: "46px",
                lineHeight: "46px",
                fontSize: "1.5em",
                color: "rgba(0,0,0,0.5)",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await handleSearch();
                }
              }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
}
