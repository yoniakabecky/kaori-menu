import React from "react";

import TopNav from "@@/components/Layouts/TopNav";
import { MainContext } from "@@/context/MainContext";
import { LOADING_CATEGORIES, SET_CATEGORIES } from "@@/context/types";
import { getAllCategoriesWithItems } from "@@/utils/handlers";
import Menu from "./Menu";

export default function HomePage({ firstLoad }) {
  const [language, setLanguage] = React.useState("EN");
  const {
    state: { loading, categories },
    dispatch,
  } = React.useContext(MainContext);

  React.useEffect(() => {
    async function fetchCategories() {
      dispatch({ type: LOADING_CATEGORIES });

      dispatch({
        type: SET_CATEGORIES,
        payload: [...(await getAllCategoriesWithItems())],
      });
    }

    fetchCategories();
  }, []);

  return (
    <React.Fragment>
      <TopNav language={language} setLanguage={setLanguage} />

      {!loading && categories.length > 0 ? (
        <Menu categories={categories} language={language} />
      ) : (
        <Menu categories={firstLoad} language={language} />
      )}
    </React.Fragment>
  );
}
