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
  // const visibility = React.useContext(VisibilityContext);
  const router = useRouter();
  // const visible = visibility.isItemVisible(itemId);
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
      }}
    >
      <Paper elevation={5} style={styles.paper}>
        <Image
          alt="Picture of the Movie"
          src={MovieDetails.poster_path!!}
          width={160}
          height={200}
          style={styles.image}
        />
      </Paper>
      <RatingSmollCircle value={MovieDetails.cinebase_rating} />
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
