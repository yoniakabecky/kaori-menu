import { useRouter } from "next/router";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import firebase from "../utils/firebaseConfig";
import { InputLabel, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "2rem",
    textAlign: "center",
  },
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

    "& button": {
      margin: "0.5rem 1rem 0.5rem 0",
    },
    "& input": {
      display: "none",
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
  item: "",
  description: "",
  price: "",
  category: "",
  askAvailability: false,
  display: true,
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddItemPage() {
  const classes = useStyles();
  const router = useRouter();
  const [error, setError] = useState({ ...initInput });
  const [input, setInput] = useState({ ...initInput });
  const [availability, setAvailability] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errorBar, setErrorBar] = useState(false);
  const inputFile = React.useRef(null);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("categories")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(data);
      });
  }, []);

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

  const handleFileUpload = (e) => {
    console.log(e.target.files);

    // TODO: upload to firebase storage
  };

  const inputValidation = () => {
    let errorMsg = { ...initInput };

    errorMsg.item = input.item === "" ? "Item Name must not be empty" : "";
    errorMsg.price = input.price === "" ? "Price must not be empty" : "";
    errorMsg.category = input.category === "" ? "Must choose a category" : "";

    setError({ ...errorMsg });

    return input.item === "" || input.price === "" || input.category === "";
  };

  const handleAdd = async () => {
    const hasError = inputValidation();

    if (!hasError) {
      await firebase
        .firestore()
        .collection("items")
        .add({
          ...input,
          askAvailability: availability,
        });

      setInput({
        ...initInput,
      });

      router.back();
    } else {
      setErrorBar(true);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h2" color="textSecondary" className={classes.title}>
        Add Item
      </Typography>

      <Box component="form" className={classes.form}>
        <TextField
          label="item name"
          variant="filled"
          name="item"
          className={classes.input}
          value={input.item}
          onChange={handleChange}
          onBlur={handleOnBlur}
          required
          error={error.item !== ""}
          helperText={error.item}
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
                  {choice.category}
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

        <Box className={classes.fileSelector}>
          <input ref={inputFile} onChange={handleFileUpload} type="file" />
          <Button
            variant="contained"
            color="default"
            onClick={() => inputFile.current.click()}
            disabled
          >
            Select Image
          </Button>

          {/* TODO: display file name */}
          <span>file name</span>
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

          <Button variant="contained" color="secondary" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={errorBar}
        onClose={() => setErrorBar(false)}
        autoHideDuration={5000}
      >
        <Alert severity="error">
          Failed to add item. Please enter required fields.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
