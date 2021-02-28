import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { LOGOUT } from "@@/context/types";
import { MainContext } from "@@/context/MainContext";
import { logout } from "@@/utils/authHandlers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    backgroundColor: "#4F4F4F",
    width: "16rem",
    height: "100%",
    textAlign: "center",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginTop: "3rem",

    "& a": {
      textDecoration: "none",
      margin: "0.75rem auto",
      fontSize: "1.125rem",
      fontWeight: 700,
      color: theme.palette.text.secondary,
    },
  },
  btn: {
    margin: "1rem auto",
    padding: "0.75rem",
    width: "10rem",
  },
  logo: { margin: "2rem auto" },
  logout: { position: "relative" },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function SideNav() {
  const classes = useStyles();
  const router = useRouter();
  const { dispatch } = React.useContext(MainContext);
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();

    dispatch({ type: LOGOUT });
    router.push("/admin");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.links}>
        <Link href="/admin/menu">Admin Top</Link>
        <Link href="/admin/categories">Categories</Link>
        <Link href="/admin/items">Items</Link>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        className={classes.btn}
        onClick={() => router.push("/")}
        disabled={loading}
      >
        Back to Menu
      </Button>

      <Box className={classes.logout}>
        <Button
          variant="contained"
          color="default"
          className={classes.btn}
          onClick={handleLogout}
          disabled={loading}
        >
          Log out
        </Button>

        {loading && (
          <Box component="span" className={classes.progress}>
            <CircularProgress size={28} color="secondary" />
          </Box>
        )}
      </Box>

      <Box className={classes.logo}>
        <Image src="/static/logo.png" alt="logo" width="138" height="32" />
      </Box>
    </Box>
  );
}
