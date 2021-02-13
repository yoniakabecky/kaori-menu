import Link from "next/link";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import FullScreenLayout from "@@/components/Layouts/FullScreenLayout";
import verifyCookie from "@@/utils/verifyCookie";

const useStyles = makeStyles({
  button: {
    minWidth: "10rem",
    minHeight: "3rem",
  },
});

export default function AdminTop({ authenticated }) {
  const classes = useStyles();

  return (
    <FullScreenLayout>
      <Box>
        <Link href={authenticated ? "/admin/menu" : "/admin/login"}>
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

export async function getServerSideProps(context) {
  const props = await verifyCookie(context);

  return {
    props,
  };
}
