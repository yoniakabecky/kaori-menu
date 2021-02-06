import Image from "next/image";
import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";

import MenuIcon from "../Icons/MenuIcon";
import JapaneseFlag from "../Icons/JapaneseFlag";
import CanadianFlag from "../Icons/CanadianFlag";

export default function TopNav({
  isAdmin,
  language,
  setLanguage,
  openMenu,
  setOpenMenu,
}) {
  return (
    <AppBar position="fixed">
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <Image src="/static/logo.png" alt="logo" width="138" height="32" />

          <Box component="span" flexGrow="1" />

          {isAdmin ? (
            <IconButton onClick={() => setOpenMenu(!openMenu)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setLanguage(language === "EN" ? "JP" : "EN")}
              aria-label="Language"
            >
              {language === "EN" ? <JapaneseFlag /> : <CanadianFlag />}
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
