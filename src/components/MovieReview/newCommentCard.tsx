import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Stack, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import * as React from "react";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const session = useSession();
  const [reviewHeading, setReviewHeading] = React.useState("");
  const [reviewContent, setReviewContent] = React.useState("");
  function handleSubmit() {
    console.log(reviewHeading, reviewContent);
    
  }
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {session.data?.user?.image}
          </Avatar>
        }
        title={session.data?.user?.name}
      />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            fullWidth={true}
            id="outlined-textarea"
            label="Review Heading"
            placeholder="Please Enter Heading For Your Review"
            multiline
            onChange={(e) => setReviewHeading(e.target.value)}
            value={reviewHeading}
          />
          <TextField
            fullWidth={true}
            id="outlined-textarea"
            label="Review Content"
            placeholder="Please Enter Content For Your Review"
            multiline
            onChange={(e) => setReviewContent(e.target.value)}
            value={reviewContent}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
