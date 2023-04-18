import { Movies } from "@/atoms/atom";
import { Movie, getAllMoviesRequest } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useRecoilState, useRecoilValue } from "recoil";

export function Card({
  title,
  itemId,
  MovieDetails,
}: {
  title: string;
  itemId: string;
  MovieDetails: Movie;
}) {
  const visibility = React.useContext(VisibilityContext);
  const visible = visibility.isItemVisible(itemId);
  const styles = {
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 210,
      width: 170,
      borderRadius: 10,
    },
    image: {
      borderRadius: 10,
    },
  };
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
      <div>
        <Typography fontWeight={900} style={{ paddingLeft: "5px" }}>
          {title}
        </Typography>
        <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
          visible: {JSON.stringify(visible)}
        </div>
      </div>

      {/* <div
        style={{
          backgroundColor: "bisque",
          height: "200px",
        }}
      /> */}
    </div>
  );
}
