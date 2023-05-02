import { Movie, getAllMoviesRequest } from "@/types/types";
import Image from "next/image";
import React, { useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import RatingSmollCircle from "../RatingSmollCircle/RatingSmollCircle";
import { ButtonBase } from "@mui/material";
import { useRouter } from "next/router";
export function Card({
  title,
  itemId,
  MovieDetails,
}: {
  title: string;
  itemId: string;
  MovieDetails: Movie;
}) {
  const router = useRouter();
  const styles = {
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 210,
      width: 170,
      borderRadius: 10,
      zIndex: -10,
    },
    image: {
      borderRadius: 10,
    },
    //
  };
  function replaceSpacesWithHyphens(inputString: string): string {
    return inputString.replace(/ /g, "-");
  }
  return (
    <div
      role="button"
      style={{
        display: "inline-block",
        margin: "0 10px",
        width: "160px",
        userSelect: "none",
      }}
      tabIndex={0}
      onClick={() => {
        console.log("image item click");
        router.push(
          `/main/movie/${replaceSpacesWithHyphens(
            MovieDetails.title + " " + MovieDetails.id
          )}`
        );
      }}
    >
      <Paper elevation={5} style={styles.paper}>
        <Image
          alt="Picture of the Movie"
          src={
            "https://image.tmdb.org/t/p/original" + MovieDetails.poster_path!!
          }
          width={160}
          height={200}
          style={styles.image}
        />
      </Paper>
      <RatingSmollCircle value={MovieDetails.cinebase_rating * 10} />
      <div>
        <ButtonBase
          style={{ textAlign: "left" }}
          onClick={() => {
            router.push(
              `/main/movie/${replaceSpacesWithHyphens(
                MovieDetails.title + " " + MovieDetails.id
              )}`
            );
          }}
        >
          <Typography fontWeight={900} className="MovieCardTitle">
            {title}
          </Typography>
        </ButtonBase>
      </div>
    </div>
  );
}
