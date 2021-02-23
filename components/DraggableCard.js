import { useRouter } from "next/router";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { downloadUrl } from "@@/utils/imageHandlers";
import DraggableIcon from "./Icons/DraggableIcon";
import EditIcon from "./Icons/EditIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: "1rem auto",
    padding: "0.5rem 0",
    minHeight: "40px",
  },
  name: {
    margin: "0 2.5rem",
    lineHeight: "24px",
  },
  description: {
    marginTop: "0.5rem",
    padding: "0 1rem",
    color: "#828282",
  },
  price: {
    padding: "0.25rem 1rem",
    fontWeight: 700,
  },
  display: {
    padding: "0 1rem",
  },
  image: {
    paddingRight: "1rem",
    textAlign: "right",

    "& img": {
      maxWidth: "85%",
      height: "100%",
      maxHeight: 80,
      borderRadius: 5,
    },
  },
  drag: {
    position: "absolute",
    top: "0.5rem",
    left: "0.5rem",
  },
  edit: {
    position: "absolute",
    top: "0",
    right: "0.5rem",
  },
}));

export default function DraggableCard({ type, ...props }) {
  const classes = useStyles();
  const router = useRouter();
  const [imageUrl, setImageUrl] = React.useState(null);
  const {
    id,
    description,
    price,
    image,
    askAvailability,
    display,
    name,
    index,
  } = props;

  React.useEffect(() => {
    if (image) {
      async function getImageUrl() {
        setImageUrl(await downloadUrl(image));
      }

      getImageUrl();
    }
  }, []);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <span className={classes.drag} {...provided.dragHandleProps}>
            <DraggableIcon />
          </span>

          <Typography variant="h3" className={classes.name}>
            {name}
          </Typography>

          <IconButton
            className={classes.edit}
            onClick={() => router.push(`/admin/${type}/${id}`)}
          >
            <EditIcon />
          </IconButton>

          {description && (
            <Typography variant="body1" className={classes.description}>
              {description}
            </Typography>
          )}

          {type === "item" && (
            <Grid container>
              <Grid item xs={6} sm={8}>
                <Typography variant="body1" className={classes.price}>
                  $ {price}
                </Typography>

                <Typography
                  variant="body2"
                  color="secondary"
                  className={classes.display}
                >
                  Display: {display ? "On" : "Off"}
                </Typography>

                <Typography
                  variant="body2"
                  color="secondary"
                  className={classes.display}
                >
                  Ask Server: {askAvailability ? "On" : "Off"}
                </Typography>
              </Grid>

              {image && imageUrl && (
                <Grid item xs={6} sm={4} className={classes.image}>
                  <img src={imageUrl} alt={name} />
                </Grid>
              )}
            </Grid>
          )}
        </Paper>
      )}
    </Draggable>
  );
}
