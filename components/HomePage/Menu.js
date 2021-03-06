import React, { useState } from "react";
import { Link } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Footer from "@@/components/Layouts/Footer";
import CategorySection from "./CategorySection";

const useStyles = makeStyles((theme) => ({
  tabs: {
    position: "fixed",
    top: 56,
    right: 0,
    left: 0,
    padding: "0 1rem 1rem",
    backgroundColor: theme.palette.background.secondary,
    overflowX: "scroll",
  },
  tab: {
    alignItems: "flex-end",
    borderBottom: "2px solid #828282",
    minWidth: "7.5rem",
    textTransform: "none",
  },
  selectedTab: {
    color: theme.palette.secondary.main,
  },
  contents: {
    marginTop: 100,
    backgroundColor: theme.palette.background.secondary,
    overflow: "scroll",
  },
  maxWidth: {
    margin: "0 auto",
    maxWidth: 600,
  },
}));

export default function Menu({ categories, language }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Tabs
        value={selectedTab}
        classes={{ root: classes.tabs, scroller: classes.maxWidth }}
        variant="scrollable"
        scrollButtons="off"
        onChange={(_, newTab) => setSelectedTab(newTab)}
      >
        {categories.map((data, i) => (
          <Tab
            key={data.id}
            label={data.name}
            classes={{ root: classes.tab, selected: classes.selectedTab }}
            component={Link}
            to={data.id}
            spy={true}
            hashSpy={true}
            smooth={true}
            offset={-100}
            duration={500}
            delay={800}
            isDynamic={true}
            onSetActive={() => setSelectedTab(i)}
          />
        ))}
      </Tabs>

      <div className={classes.contents}>
        <Container maxWidth="sm">
          {categories.map((data) => (
            <CategorySection data={data} language={language} key={data.id} />
          ))}
        </Container>

        <Footer />
      </div>
    </>
  );
}
