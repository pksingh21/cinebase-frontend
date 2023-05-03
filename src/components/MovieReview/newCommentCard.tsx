import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Rating, Stack, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import * as React from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useRecoilValue } from "recoil";
import { CurrentMovie } from "@/atoms/atom";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

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
  const [ratingNumber, setRatingNumber] = React.useState(0);
  const currentMovie = useRecoilValue(CurrentMovie);
  //console.log(
    // reviewHeading,
    // reviewContent,
    // session.data?.user.apiKey,
    // "api key here"
  // );
  async function handleSubmit() {
    const dataFinal = {
      reviewHeading: reviewHeading,
      reviewContent: reviewContent,
      Date: new Date().toISOString().slice(0, 10),
    };
    const AxiosPayLoad = JSON.stringify(dataFinal);
    const userIdIndB = await axios.get("/api/user/getUserId", {
      params: {
        apiKey: session.data?.user.apiKey,
      },
    });
    //console.log(userIdIndB, "user id in db");
    const result = await axios.post("/api/comments/createComments", {
      review: AxiosPayLoad,
      rating: value,
      movie: currentMovie.id,
      user: userIdIndB.data.pk,
      apiKey: session.data?.user.apiKey,
    });
  }
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);
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
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
            paddingBottom: "20px",
            paddingTop: "-30px",
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
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
