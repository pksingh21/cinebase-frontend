import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        top: "-14px",
        left: "-5px",
        backgroundColor: "black",
        borderRadius: "50%",
      }}
    >
      <CircularProgress
        sx={{
          color:
            props.value > 75 ? "green" : props.value > 40 ? "yellow" : "red",
        }}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
          fontWeight={900}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic({ value }: { value: number }) {
  return <CircularProgressWithLabel value={value} />;
}
