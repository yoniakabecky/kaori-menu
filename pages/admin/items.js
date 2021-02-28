import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import ItemsPage from "@@/components/ItemsPage";
import { MainContext } from "@@/context/MainContext";
import { SET_CATEGORIES } from "@@/context/types";
import { getAllCategoriesWithItems } from "@@/utils/handlers";
import verifyCookie from "@@/utils/verifyCookie";

export default function Items() {
  const { state, dispatch } = React.useContext(MainContext);

  React.useEffect(() => {
    async function fetchCategories() {
      dispatch({
        type: SET_CATEGORIES,
        payload: await getAllCategoriesWithItems(),
      });
    }

    if (state.categories.length <= 0) {
      fetchCategories();
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Items - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Items">
        <ItemsPage categories={state.categories} />
      </AdminLayout>
    </React.Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const auth = await verifyCookie(context);

  if (!auth.authenticated) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
