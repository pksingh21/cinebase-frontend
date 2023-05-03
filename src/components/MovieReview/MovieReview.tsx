import { Grid, Typography } from "@mui/material";
import GenericCommentCard from "./genericCommentCard";
import NewCommentCard from "./newCommentCard";
import { Review } from "@/types/types";
import React from "react";
export default function MovieReview() {
  const [AllReviews, setAllReviews] = React.useState<Review[]>([]);
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
