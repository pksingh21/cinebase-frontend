import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { errorAtom } from "@/atoms/atom";
import { useSession } from "next-auth/react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [errorAtomState, setErrorAtomState] = useRecoilState(errorAtom);
  console.log(errorAtomState, "error Atom State in snackbar");
  const handleClick = () => {
    setErrorAtomState({ isError: false, errorMessage: "", errorType: "" });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorAtomState({ isError: false, errorMessage: "", errorType: "" });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={errorAtomState.isError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={errorAtomState.isError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorAtomState.isError ? errorAtomState.errorMessage : "Success"}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
