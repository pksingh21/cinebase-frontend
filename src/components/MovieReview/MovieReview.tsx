import { Grid, Typography } from "@mui/material";
import GenericCommentCard from "./genericCommentCard";
import NewCommentCard from "./newCommentCard";
import { Review } from "@/types/types";
import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { CurrentMovie, TriggerReRenderForParent } from "@/atoms/atom";
export default function MovieReview() {
  const [AllReviews, setAllReviews] = React.useState<Review[]>([]);
  const MovieID = useRecoilValue(CurrentMovie);
  const triggerFromChild = useRecoilValue(TriggerReRenderForParent);
  React.useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/comments/getAllComments`,
        {
          params: {
            movie: MovieID.id,
          },
        }
      );
      const data = res.data;
      console.log(data, "data");
      setAllReviews(data.results);
    };
    getReviews();
  }, [MovieID, triggerFromChild]);
  React.useEffect(() => {}, [AllReviews]);
  console.log(AllReviews, "all reviews");
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
          {AllReviews.map((Review) => {
            return <GenericCommentCard data={Review} />;
          })}
        </Grid>
      </Grid>
    </div>
  );
}
