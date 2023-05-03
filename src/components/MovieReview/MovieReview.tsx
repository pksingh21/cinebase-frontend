import { Grid, Typography } from "@mui/material";
import GenericCommentCard from "./genericCommentCard";
import NewCommentCard from "./newCommentCard";
import { Review } from "@/types/types";
import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { CurrentMovie } from "@/atoms/atom";
export default function MovieReview() {
  const [AllReviews, setAllReviews] = React.useState<Review[]>([]);
  const MovieID = useRecoilValue(CurrentMovie);
  React.useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/comments/getAllComments`,
        {
          params: {
            movieId: MovieID.id,
          },
        }
      );
      const data = res.data;
      setAllReviews(data.results);
    };
    getReviews();
  }, [MovieID]);
  return (
    <div>
      <Typography
        variant="h3"
        fontWeight={900}
        gutterBottom
        color={`white`}
        display={`inline`}
      >
        User Review
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <NewCommentCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GenericCommentCard />
        </Grid>
      </Grid>
    </div>
  );
}
