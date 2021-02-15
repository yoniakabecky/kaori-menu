import { useRouter } from "next/router";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

import { uploadFile } from "@@/utils/imageHandlers";
import ErrorSnackbar from "./ErrorSnackbar";

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  input: {
    margin: "0.5rem auto",
    width: "80%",
  },
  buttons: {
    marginTop: "1rem",

    "& button": {
      margin: "1rem 0.5rem",
    },
  },
  fileSelector: {
    display: "flex",
    alignItems: "center",
    margin: "0.5rem auto",
    width: "80%",

    "& input": {
      display: "none",
    },
    "& label": {
      margin: "0.5rem 1rem 0.5rem 0",
      padding: "0.5rem 1.5rem",
      borderRadius: 5,
      backgroundColor: theme.palette.background.secondary,
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
  },
  choice: {
    textAlign: "left",
  },
  snackBar: {
    padding: "0.5rem",
    backgroundColor: theme.palette.error.main,
  },
}));

const initInput = {
  name: "",
  description: "",
  price: "",
  category: "",
  askAvailability: false,
  display: true,
  option: "",
  japanese: "",
};

export default function ItemInput({
  handleSave,
  categories,
  data = initInput,
}) {
  const classes = useStyles();
  const router = useRouter();
  const [input, setInput] = useState({ ...data });
  const [availability, setAvailability] = useState(false);
  const [error, setError] = useState({ name: "", price: "", category: "" });
  const [errorBar, setErrorBar] = useState(false);
  const [file, setFile] = useState(null);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setError({ ...error, [name]: `${name} must not be empty` });
    } else {
      setError({ ...error, [name]: "" });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    if (value !== "" && error[name] !== "") {
      setError({ ...error, [name]: "" });
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const inputValidation = () => {
    let errorMsg = { name: "", price: "", category: "" };

    errorMsg.name = input.name === "" ? "Item Name must not be empty" : "";
    errorMsg.price = input.price === "" ? "Price must not be empty" : "";
    errorMsg.category = input.category === "" ? "Must choose a category" : "";

    setError({ ...errorMsg });

    return input.name === "" || input.price === "" || input.category === "";
  };

  const handleClick = async () => {
    let hasError = inputValidation();

    let newInput = {
      ...input,
      askAvailability: availability,
    };

    if (file) {
      const uploadedImage = await uploadFile(file);

      if (uploadedImage) {
        newInput = {
          ...newInput,
          image: uploadedImage,
        };
      } else {
        hasError = false;
      }
    }

    if (!hasError) {
      const result = await handleSave(newInput);

      if (result) {
        setInput({
          ...initInput,
        });

        router.back();
      } else {
        setErrorBar(true);
      }
    } else {
      setErrorBar(true);
    }
  };

  return (
    <React.Fragment>
      <Box component="form" className={classes.form}>
        <TextField
          label="item name"
          variant="filled"
          name="name"
          className={classes.input}
          value={input.name}
          onChange={handleChange}
          onBlur={handleOnBlur}
          required
          error={error.name !== ""}
          helperText={error.name}
        />

        <TextField
          label="item name (Japanese)"
          variant="filled"
          name="japanese"
          className={classes.input}
          value={input.japanese}
          onChange={handleChange}
        />

        <TextField
          label="description"
          variant="filled"
          name="description"
          multiline
          rows={4}
          className={classes.input}
          value={input.description}
          onChange={handleChange}
        />

        <TextField
          label="price"
          variant="filled"
          name="price"
          className={classes.input}
          value={input.price}
          onChange={handleChange}
          onBlur={handleOnBlur}
          required
          error={error.price !== ""}
          helperText={error.price}
        />

        <FormControl
          variant="filled"
          className={classes.input}
          required
          error={error.category !== ""}
        >
          <InputLabel>category</InputLabel>

          <Select
            value={input.category}
            onChange={handleChange}
            className={classes.choice}
            onBlur={handleOnBlur}
            name="category"
          >
            {categories.length !== 0 ? (
              categories.map((choice) => (
                <MenuItem value={choice.id} key={choice.id}>
                  {choice.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No Category</MenuItem>
            )}
          </Select>

          {error.category !== "" && (
            <FormHelperText>{error.category}</FormHelperText>
          )}
        </FormControl>

        <TextField
          label="option"
          placeholder="V: vegetarian / SP: spicy"
          variant="filled"
          name="option"
          className={classes.input}
          value={input.option}
          onChange={handleChange}
        />

        <Box className={classes.fileSelector}>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
          />
          <label htmlFor="file">
            {input.image ? input.image : file ? file.name : "Select a file"}
          </label>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={availability}
              onChange={() => setAvailability(!availability)}
              name="availability"
            />
          }
          label="Ask availability"
          className={classes.input}
        />

        <Box className={classes.buttons}>
          <Button color="default" onClick={() => router.back()}>
            Cancel
          </Button>

          <Button variant="contained" color="secondary" onClick={handleClick}>
            Save
          </Button>
        </Box>
      </Box>

      <ErrorSnackbar open={errorBar} onClose={() => setErrorBar(false)}>
        Failed to add item. Please enter required fields.
      </ErrorSnackbar>
    </React.Fragment>
  );
}
