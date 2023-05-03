import { Review } from "@/types/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { data } from "autoprefixer";
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

export default function RecipeReviewCard(props: { data: Review }) {
  const [expanded, setExpanded] = React.useState(false);
  const obj = JSON.parse(props.data.review!!);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [userName, setUserName] = React.useState("");
  const session = useSession();
  return (
    <Card style={{ marginTop: "4px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {session.data?.user?.image}
          </Avatar>
        }
        title={session.data?.user?.name}
        subheader={obj.Date}
      />
      <CardHeader variant="body1">{obj.reviewHeading}</CardHeader>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {obj.reviewContent}
        </Typography>
      </CardContent>
    </Card>
  );
}
