import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333",
    },
    secondary: {
      main: "#EB5757",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#333",
    },
  },
});

export default theme;
