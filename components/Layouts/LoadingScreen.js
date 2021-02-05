import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "45vh",
    textAlign: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.secondary,
  },
}));

export default function LoadingScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}
