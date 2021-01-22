import Link from "next/link";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import FullScreenLayout from "../../components/FullScreenLayout";

const useStyles = makeStyles({
  button: {
    minWidth: "10rem",
    minHeight: "3rem",
  },
});

export default function AdminTop() {
  const classes = useStyles();

  return (
    <FullScreenLayout>
      <Box>
        <Link href="/admin/login">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Admin Login
          </Button>
        </Link>
      </Box>

      <Box>
        <Link href="/">
          <Button
            variant="contained"
            color="default"
            className={classes.button}
          >
            Back to Menu
          </Button>
        </Link>
      </Box>
    </FullScreenLayout>
  );
}
