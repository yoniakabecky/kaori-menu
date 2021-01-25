import { useRouter } from "next/router";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
  },
  input: {
    margin: "0.5rem auto",
    width: "80%",
  },
  btn: {
    margin: "1rem 0.5rem",
  },
}));

export default function CategoryInput({ handleSave, ...initInput }) {
  const classes = useStyles();
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [input, setInput] = React.useState({ ...initInput });

  const handleChange = (e) => {
    e.preventDefault();

    if (input.name !== "" && error !== "") setError("");

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (input.category === "") {
      setError("Category name must not be empty");
    } else {
      const result = await handleSave(input);

      if (result) {
        setInput({
          category: "",
          description: "",
        });

        router.back();
      } else {
        setError("Category is already exist");
      }
    }
  };

  return (
    <Box component="form" className={classes.form}>
      <TextField
        label="category name"
        variant="filled"
        name="category"
        className={classes.input}
        value={input.category}
        onChange={handleChange}
        required
        error={error !== ""}
        helperText={error}
      />

      <TextField
        label="description"
        variant="filled"
        name="description"
        multiline
        rows={6}
        className={classes.input}
        value={input.description}
        onChange={handleChange}
      />

      <Box>
        <Button
          color="default"
          className={classes.btn}
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={handleClick}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
