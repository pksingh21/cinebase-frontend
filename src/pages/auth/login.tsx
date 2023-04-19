import React from "react";
import {
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { credentialAtom, errorAtom } from "@/atoms/atom";
import Snackbar from "@/components/snackbar/snackbar";
import { styles } from "@/styles/styles";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const [CredentialAtomState, setCredentialAtomState] =
    useRecoilState(credentialAtom);
  const setErrorAtomState = useSetRecoilState(errorAtom);
  return (
    <Grid
      container
      direction="column"
      justifyContent={"center"}
      alignItems="center"
      style={styles.paperContainer}
    >
      <Snackbar />
      <Image
        src="/assets/backgroundimage2.png"
        alt="Background Image"
        priority={true}
        style={{ zIndex: -2, position: "fixed" }}
        width={`2220`}
        height={`2080`}
      />
      <Grid item xs={12} sm={6} md={4}>
        <Image
          src={"/assets/logo3.png"}
          alt="Logo App"
          width={`800`}
          height={`800`}
          style={styles.image}
        />
        <Paper elevation={10} style={styles.paper} className="paperComponent">
          <Grid alignItems={`center`}>
            {CredentialAtomState.signInOrLogin === "signup" && <h2>Sign Up</h2>}
            {CredentialAtomState.signInOrLogin === "login" && <h2>Login</h2>}
          </Grid>

          <Stack spacing={2} style={styles.stack}>
            <TextField
              label="Username"
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => {
                e.preventDefault();
                setCredentialAtomState((old) => ({
                  ...old,
                  username: e.target.value,
                }));
              }}
            />
            {CredentialAtomState.signInOrLogin === "signup" && (
              <TextField
                label="Email Id"
                placeholder="Enter Email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => {
                  e.preventDefault();
                  setCredentialAtomState((old) => ({
                    ...old,
                    emailId: e.target.value,
                  }));
                }}
              />
            )}
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => {
                e.preventDefault();
                setCredentialAtomState((old) => ({
                  ...old,
                  password: e.target.value,
                }));
              }}
            />
            {CredentialAtomState.signInOrLogin === "signup" && (
              <TextField
                label="Confirm Password"
                placeholder="Enter password again to confirm"
                type="password"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => {
                  e.preventDefault();
                  setCredentialAtomState((old) => ({
                    ...old,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
            )}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={async (e) => {
                e.preventDefault();
                console.log(CredentialAtomState, "credentials being sent");
                const result = await signIn("credentials", {
                  redirect: false,
                  ...CredentialAtomState,
                });
                console.log(result);
                if (result?.error) {
                  const errorMessage = result.error;
                  setErrorAtomState((old) => ({
                    ...old,
                    isError: true,
                    errorMessage: errorMessage,
                    errorType: CredentialAtomState.signInOrLogin,
                  }));
                } else {
                  router.push("/main/main");
                }
              }}
            >
              <Typography fontWeight={900}>
                {CredentialAtomState.signInOrLogin === "signup"
                  ? `Sign Up`
                  : `Sign In`}
              </Typography>
            </Button>
          </Stack>
          <Typography>
            {" "}
            {CredentialAtomState.signInOrLogin === "login"
              ? `New Here ? `
              : `Already Registered ? `}
            <Link
              onClick={() => {
                if (CredentialAtomState.signInOrLogin === "login") {
                  setCredentialAtomState((old) => ({
                    ...old,
                    signInOrLogin: "signup",
                  }));
                } else {
                  setCredentialAtomState((old) => ({
                    ...old,
                    signInOrLogin: "login",
                  }));
                }
              }}
            >
              {CredentialAtomState.signInOrLogin === "login"
                ? `Sign Up`
                : `Sign In`}
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
