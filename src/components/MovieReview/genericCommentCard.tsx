import { Review } from "@/types/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Rating } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { data } from "autoprefixer";
import axios from "axios";
import { useSession } from "next-auth/react";
import * as React from "react";
import  StarIcon  from "@mui/icons-material/Star";
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

export default function RecipeReviewCard(props: { data: Review }) {
  const [expanded, setExpanded] = React.useState(false);
  const obj = JSON.parse(props.data.review!!);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [userName, setUserName] = React.useState("");
  React.useEffect(() => {
    async function getUserDetails() {
      const result = await axios.get("/api/user/getUserInfo", {
        params: {
          id: props.data.user,
        },
      });
      console.log(result.data.username);
      setUserName(result.data.username);
    }
    getUserDetails();
  }, []);
  const session = useSession();
  return (
    <Card style={{ marginTop: "4px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {session.data?.user?.image}
          </Avatar>
        }
        title={userName}
        subheader={obj.Date}
      />
      <CardContent style={{ paddingTop: "-30px" }}>
        <Rating
          name="hover-feedback"
          value={props.data.rating}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Typography color="black" fontWeight={900} fontSize={`25px`}>
          {obj.reviewHeading}
        </Typography>
        <Typography color="text.secondary">{obj.reviewContent}</Typography>
      </CardContent>
    </Card>
  );
}
