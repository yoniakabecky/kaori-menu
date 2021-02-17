import Image from "next/image";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import FacebookIcon from "../Icons/FacebookIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import LocationIcon from "../Icons/LocationIcon";
import MailIcon from "../Icons/MailIcon";
import PhoneIcon from "../Icons/PhoneIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  grid: {
    padding: "2rem",
    minHeight: "8rem",
  },
  icons: {
    marginRight: "0.5rem",
    minWidth: 14,
  },
  socialLink: {
    display: "flex",
  },
  socialBtn: {
    margin: "0.5rem",
    padding: 0,
    minWidth: "1.75rem",
    minHeight: "1.75rem",
    borderRadius: "50%",
    backgroundColor: theme.palette.background.secondary,

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  info: {
    display: "flex",
    marginLeft: "1rem",

    "&:first-child": {
      marginBottom: "0.5rem",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container
        maxWidth="sm"
        component={Grid}
        container
        className={classes.grid}
      >
        <Grid item xs={6}>
          <Image src="/static/logo.png" alt="logo" width="138" height="32" />

          <Box className={classes.socialLink}>
            <Button
              target="_blank"
              href="https://www.facebook.com/Kaori-Izakaya-on-Main-660919604383880/"
              className={classes.socialBtn}
              rel="noopener"
              aria-label="facebook"
            >
              <FacebookIcon />
            </Button>

            <Button
              target="_blank"
              href="https://www.instagram.com/kaoriizakaya/"
              className={classes.socialBtn}
              rel="noopener"
              aria-label="instagram"
            >
              <InstagramIcon />
            </Button>

            <Button
              target="_blank"
              href="mailto:kaorionmain@gmail.com"
              className={classes.socialBtn}
              aria-label="email"
            >
              <MailIcon />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box className={classes.info}>
            <LocationIcon className={classes.icons} />

            <Typography variant="body2" color="textSecondary">
              3043 Main St, <br />
              Vancouver, <br />
              BC V5T 3G6
            </Typography>
          </Box>

          <Box className={classes.info}>
            <PhoneIcon className={classes.icons} />

            <Typography variant="body2" color="textSecondary">
              604-675-5053
            </Typography>
          </Box>
        </Grid>
      </Container>
    </footer>
  );
}
