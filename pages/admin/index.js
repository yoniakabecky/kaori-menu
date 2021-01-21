import Link from "next/link";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import FullScreenLayout from "../../components/FullScreenLayout";

const useStyles = makeStyles({
  button: {
    margin: "1rem auto",
  },
});

export default function AdminTop() {
  const classes = useStyles();

  return (
    <FullScreenLayout>
      <Box className={classes.button}>
        <Link href="/admin/login">
          <Button variant="contained" color="secondary">
            Admin Login
          </Button>
        </Link>
      </Box>

      <Box className={classes.button}>
        <Link href="/">
          <Button variant="contained" color="default">
            Back to Menu
          </Button>
        </Link>
      </Box>
    </FullScreenLayout>
  );
}
