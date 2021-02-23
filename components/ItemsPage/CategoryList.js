import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { MainContext } from "@@/context/MainContext";
import { UPDATE_ITEMS } from "@@/context/types";
import { updateOrder } from "@@/utils/handlers";
import TriangleIcon from "../Icons/TriangleIcon";
import DraggableCard from "../DraggableCard";

const useStyles = makeStyles((theme) => ({
  category: {
    position: "relative",
    display: "flex",
    margin: "1rem auto",
    padding: "0.5rem 1rem",
    backgroundColor: theme.palette.primary.main,
    color: "#828282",
  },
  grow: { flexGrow: 1 },
  name: { marginTop: 4 },
}));

export default function CategoryList({ name, items }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const { dispatch } = React.useContext(MainContext);

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) return;

    const newOrder = [...items];
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, items[source.index]);

    const update = Promise.all(
      newOrder.map(async (item, index) => {
        if (item.order !== index + 1) {
          await updateOrder("items", item.id, index + 1);
        }
      })
    );

    if (update) {
      dispatch({
        type: UPDATE_ITEMS,
        payload: {
          category: name.toLowerCase(),
          items: newOrder,
        },
      });
    }
  };

  return (
    <React.Fragment>
      <Paper className={classes.category} onClick={() => setIsOpen(!isOpen)}>
        <motion.span
          initial={false}
          animate={{ color: isOpen ? "#EB5757" : "#828282" }}
          className={classes.grow}
        >
          <Typography variant="h3" className={classes.name}>
            {name}
          </Typography>
        </motion.span>

        <motion.span
          initial={false}
          animate={{
            fill: isOpen ? "#EB5757" : "#828282",
            rotate: isOpen ? 180 : 0,
            transformOrigin: "center 12px",
          }}
          transition={{ duration: 0.5 }}
        >
          <TriangleIcon />
        </motion.span>
      </Paper>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="items">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {items.map((item, index) => (
                      <DraggableCard
                        {...item}
                        index={index}
                        type="item"
                        key={`item-${item.id}`}
                      />
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
