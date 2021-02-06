import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import ItemCard from "./ItemCard";
import Skeletons from "./Skeletons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem 0",
  },
  title: {
    color: theme.palette.secondary.main,
  },
  line: {
    borderRadius: 1.5,
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    height: 3,
  },
  description: {
    margin: "0.75rem 0.25rem",
  },
  skeleton: {
    marginBottom: "1rem",
    borderRadius: 10,
    width: "100%",
    height: "5rem",
  },
}));

export default function CategorySection({
  data: { id, name, description, items },
  language,
}) {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.root} id={id}>
      <Typography variant="h2" className={classes.title}>
        {name}
      </Typography>

      <Box component="div" className={classes.line} />

      <Typography
        variant="body1"
        color="primary"
        className={classes.description}
      >
        {description}
      </Typography>

      {items?.length > 0 ? (
        items.map(
          (item) =>
            item.display && (
              <ItemCard {...item} language={language} key={`item-${item.id}`} />
            )
        )
      ) : (
        <Skeletons className={classes.skeleton} />
      )}
    </Box>
  );
}
