import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { genres } from "@/types/types";
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    padding: "1px",
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "14px",
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
export interface PropsBreadCrumbs {
  releaseDate?: string;
  language?: string;
  runTime?: number;
  genres?: genres[];
}
export default function CustomizedBreadcrumbs(props: PropsBreadCrumbs) {
  function formatMovieRuntime(runtimeInMinutes: number): string {
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;

    const hourLabel = hours === 1 ? "hr" : "hrs";
    const minuteLabel = minutes === 1 ? "min" : "mins";

    const formattedHours = hours > 0 ? `${hours} ${hourLabel}` : "";
    const formattedMinutes = minutes > 0 ? `${minutes} ${minuteLabel}` : "";

    if (formattedHours && formattedMinutes) {
      return `${formattedHours}, ${formattedMinutes}`;
    } else {
      return formattedHours || formattedMinutes;
    }
  }
  //////console.log(props.genres, "props.genres");
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        {props.releaseDate != undefined && (
          <StyledBreadcrumb
            label={props.releaseDate}
            icon={<CalendarMonthIcon fontSize="small" />}
          />
        )}
        {props.language != undefined && (
          <StyledBreadcrumb label={props.language} />
        )}
        {props.runTime != undefined && (
          <StyledBreadcrumb
            label={formatMovieRuntime(props.runTime)}
            icon={<AccessTimeIcon />}
          />
        )}
        {props.genres != undefined &&
          props.genres.length > 0 &&
          props.genres.map((genre, index) => (
            <StyledBreadcrumb key={index} label={genre.name} />
          ))}
      </Breadcrumbs>
    </div>
  );
}
