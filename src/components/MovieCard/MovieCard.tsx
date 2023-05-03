import { Actor, Movie, getAllMoviesRequest } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import RatingSmollCircle from "../RatingSmollCircle/RatingSmollCircle";
import { ButtonBase } from "@mui/material";
import { useRouter } from "next/router";
export function Card({
  title,
  itemId,
  MovieDetails,
  ActorDetails,
}: {
  title?: string;
  itemId?: string;
  MovieDetails?: Movie;
  ActorDetails?: Actor;
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
  const [cardImageURL, setCardImageURL] = useState<string>(
    "https://image.tmdb.org/t/p/original" +
      (MovieDetails
        ? MovieDetails?.poster_path!!
        : ActorDetails?.profile_path!!)
  );
  useEffect(() => {
    setCardImageURL(
      "https://image.tmdb.org/t/p/original" +
        (MovieDetails
          ? MovieDetails?.poster_path!!
          : ActorDetails?.profile_path!!)
    );
  }, [MovieDetails, ActorDetails]);
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
        //////console.log("image item click");
        if (MovieDetails)
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
          src={cardImageURL}
          // src={"/assets/noImage.jpg"}
          onError={() => {
            setCardImageURL("/assets/noImage.jpg");
            console.log("image load failed");
          }}
          width={160}
          height={200}
          style={styles.image}
        />
      </Paper>
      {!ActorDetails && MovieDetails && (
        <RatingSmollCircle value={MovieDetails.cinebase_rating * 10} />
      )}
      <div>
        <ButtonBase
          style={{ textAlign: "left" }}
          onClick={() => {
            if (MovieDetails)
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
