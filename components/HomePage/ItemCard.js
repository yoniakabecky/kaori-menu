import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import HotIcon from "../Icons/HotIcon";
import LeafIcon from "../Icons/LeafIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem auto",
    padding: "1rem",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    width: "100%",
    color: "#4F4F4F",
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",

    "& h3": {
      color: "#333",
      textTransform: "capitalize",
    },
    "& h4": { marginLeft: "auto" },
  },
  option: {
    margin: "0.25rem",
    verticalAlign: "middle",
  },
  content: {
    marginTop: "0.5rem",
  },
  availability: {
    marginTop: "0.5rem",
    color: theme.palette.error.main,
  },
  image: {
    "& img": {
      maxWidth: 120,
      maxHeight: 120,
      borderRadius: 5,
    },
  },
  jp: {
    fontFamily: "'Kosugi Maru', sans-serif",
    fontSize: "1rem",
  },
}));

export default function MenuCard({ language, ...data }) {
  const classes = useStyles();

  const {
    name,
    price,
    description,
    askAvailability,
    image,
    option,
    japanese,
  } = data;

  return (
    <Box component="article" className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h3" color="primary">
          {language === "EN" ? (
            name
          ) : (
            <Box component="span" className={classes.jp}>
              {japanese}
            </Box>
          )}

          <Box component="span" className={classes.option}>
            {option === "V" ? (
              <LeafIcon />
            ) : option === "SP" ? (
              <HotIcon />
            ) : null}
          </Box>
        </Typography>

        {price && <Typography variant="h4">$ {price}</Typography>}
      </Box>

      {(description || askAvailability || image) && (
        <Grid container className={classes.content}>
          {image && (
            <Grid item xs={6} className={classes.image}>
              <img src={image} alt={data.item} />
            </Grid>
          )}

          <Grid item xs={image ? 6 : 12}>
            <Typography variant="body1">{description}</Typography>
            {askAvailability && (
              <Typography variant="body2" className={classes.availability}>
                Please ask your server for availability
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
