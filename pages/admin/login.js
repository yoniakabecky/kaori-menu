import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import FullScreenLayout from "@@/components/layouts/FullScreenLayout";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "0.5rem auto",
    width: "80%",
  },
  buttons: {
    margin: "1rem auto",
  },
  btn: {
    margin: "0 0.5rem",
    width: "6rem",
  },
}));

export default function Login() {
  const classes = useStyles();
  const router = useRouter();

  const handleLogin = () => {
    // TODO: login
    router.push("/admin/menu");
  };

  return (
    <FullScreenLayout>
      <Head>
        <title>Admin Login | Kaori Izakaya</title>
      </Head>

      <TextField label="name" variant="filled" className={classes.input} />

      <TextField label="password" variant="filled" className={classes.input} />

      <Box className={classes.buttons}>
        <Button
          color="default"
          className={classes.btn}
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </FullScreenLayout>
  );
}
