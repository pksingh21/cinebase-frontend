import { CircularProgress, Typography } from "@mui/material";
export default function RatingSmollCircle({ value }: { value: number }) {
  console.log(value, "value called for god");
  return (
    <div
      style={{
        zIndex: 2,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        size={30}
        sx={{
          color: "#FFC107",
          marginTop: "-30px",
          backgroundColor: "blue",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <div
        // variant="caption"
        style={{
          color: "red",
          marginLeft: "-10px",
          marginTop: "-30px",
          zIndex: 99,
        }}
      >
        {`${Math.round(value)}%`}
      </div>
    </div>
  );
}
