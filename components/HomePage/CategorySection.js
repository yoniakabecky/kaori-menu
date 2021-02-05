import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import MenuCard from "./MenuCard";

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

      {items.length > 0 ? (
        items.map(
          (item) =>
            item.display && (
              <MenuCard {...item} language={language} key={`item-${item.id}`} />
            )
        )
      ) : (
        <Typography variant="body2" color="secondary">
          loading...
        </Typography>
      )}
    </Box>
  );
}
