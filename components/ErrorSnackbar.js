import React from "react";

import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorSnackbar({ open, onClose, children }) {
  return (
    <MuiSnackbar open={open} onClose={onClose} autoHideDuration={5000}>
      <Alert severity="error">{children}</Alert>
    </MuiSnackbar>
  );
}
