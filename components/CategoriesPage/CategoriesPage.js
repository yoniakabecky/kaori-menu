import { useRouter } from "next/router";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import { MainContext } from "@@/context/MainContext";
import { SET_CATEGORIES } from "@@/context/types";
import { updateOrder } from "@@/utils/handlers";
import AddFolderIcon from "../Icons/AddFolderIcon";
import DraggableCard from "../DraggableCard";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    right: "1.5rem",
    bottom: "5rem",
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.up("sm")]: { right: "27%" },
    [theme.breakpoints.up("lg")]: { right: "30%" },
  },
}));

export default function CategoriesPage({ categories }) {
  const classes = useStyles();
  const router = useRouter();
  const { dispatch } = React.useContext(MainContext);

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) return;

    const newOrder = [...categories];
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, categories[source.index]);

    const update = Promise.all(
      newOrder.map(async (category, index) => {
        if (category.order !== index + 1) {
          await updateOrder("categories", category.id, index + 1);
        }
      })
    );

    if (update) {
      dispatch({
        type: SET_CATEGORIES,
        payload: newOrder,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="categories">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {categories.map((category, index) => (
              <DraggableCard
                {...category}
                index={index}
                type="category"
                key={`category-${category.id}`}
              />
            ))}

            {provided.placeholder}

            <Fab
              className={classes.fab}
              onClick={() => router.push("/admin/category/create")}
            >
              <AddFolderIcon />
            </Fab>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
