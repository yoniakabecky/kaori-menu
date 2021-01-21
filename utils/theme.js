import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Montserrat Alternates', sans-serif",
    fontSize: 14,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    h2: {
      fontSize: 24,
      fontWeight: 700,
    },
    h3: {
      fontSize: 18,
      fontWeight: 700,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
    },
  },
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#EB5757",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#333333",
      secondary: "#F2F2F2",
    },
    text: {
      secondary: "#F2F2F2",
    },
  },
});

export default theme;
