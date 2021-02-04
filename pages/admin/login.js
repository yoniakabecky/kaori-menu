import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import ErrorSnackbar from "@@/components/ErrorSnackbar";
import FullScreenLayout from "@@/components/Layouts/FullScreenLayout";
import { signIn } from "@@/utils/handlers";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "0.5rem auto",
    width: "80%",
  },
  buttons: {
    position: "relative",
    margin: "1rem auto",
  },
  btn: {
    margin: "0 0.5rem",
    width: "6rem",
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Login = () => {
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorBar, setErrorBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const res = await signIn(email, password);

    if (res?.error) {
      switch (res.error) {
        case "auth/user-not-found":
          setErrorMsg("No user found");
          break;

        case "auth/wrong-password":
          setErrorMsg("The password is invalid");
          break;

        default:
          setErrorMsg("Please enter valid email and password");
          break;
      }

      setErrorBar(true);
      setLoading(false);
    }
  };

  return (
    <FullScreenLayout>
      <Head>
        <title>Admin Login | Kaori Izakaya</title>
      </Head>

      <TextField
        label="email"
        type="email"
        value={email}
        variant="filled"
        className={classes.input}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="password"
        type="password"
        value={password}
        variant="filled"
        className={classes.input}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Box className={classes.buttons}>
        <Button
          color="default"
          className={classes.btn}
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={handleLogin}
          disabled={loading}
        >
          Login
        </Button>

        {loading && (
          <Box component="span" className={classes.progress}>
            <CircularProgress size={28} color="secondary" />
          </Box>
        )}
      </Box>

      <ErrorSnackbar open={errorBar} onClose={() => setErrorBar(false)}>
        {errorMsg}
      </ErrorSnackbar>
    </FullScreenLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
