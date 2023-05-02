import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { errorAtom } from "@/atoms/atom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [errorAtomState, setErrorAtomState] = useRecoilState(errorAtom);
  const [snackbar, setSnackBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    errorAtomState.errorMessage
  );
  React.useEffect(() => {
    setSnackBar(errorAtomState.isError);
    if (errorMessage.length === 0) {
      setErrorMessage(errorAtomState.errorMessage);
    }
  }, [errorAtomState.isError]);
  const router = useRouter();
  //console.log(errorAtomState, "error Atom State in snackbar");
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
    setSnackBar(false);
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={"error"} sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
