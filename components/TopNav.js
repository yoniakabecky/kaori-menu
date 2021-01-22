import Image from "next/image";
import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";

import MenuIcon from "./icons/MenuIcon";

export default function TopNav({ isAdmin }) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Image src="/logo.png" alt="logo" width="138" height="32" />

        <Box component="span" flexGrow="1" />

        {isAdmin && (
          <IconButton>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
