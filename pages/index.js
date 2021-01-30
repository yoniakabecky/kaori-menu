import Head from "next/head";
import React, { useState } from "react";
import { Link } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TopNav from "@@/components/layouts/TopNav";
import Footer from "@@/components/layouts/Footer";
import CategorySection from "@@/components/CategorySection";
import { getAllCategories } from "@@/utils/handlers";

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
}));

export default function Home({ categories }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <React.Fragment>
      <Head>
        <title>Menu | Kaori Izakaya</title>
      </Head>

      <TopNav />

      <Tabs
        value={selectedTab}
        className={classes.tabs}
        variant="scrollable"
        scrollButtons="off"
        onChange={(_, newTab) => setSelectedTab(newTab)}
      >
        {categories.map((data) => (
          <Tab
            key={data.id}
            label={data.category}
            classes={{ root: classes.tab, selected: classes.selectedTab }}
            component={Link}
            to={data.id}
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          />
        ))}
      </Tabs>

      <div className={classes.contents}>
        <Container>
          {categories.map((data) => (
            <CategorySection key={data.id} category={data} />
          ))}
        </Container>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export const getServerSideProps = async () => {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
};
