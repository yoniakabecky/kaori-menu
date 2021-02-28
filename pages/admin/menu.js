import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import MenuPage from "@@/components/MenuPage";
import { MainContext } from "@@/context/MainContext";
import { SET_CATEGORIES } from "@@/context/types";
import { getAllCategoriesWithItems } from "@@/utils/handlers";
import verifyCookie from "@@/utils/verifyCookie";

const AdminLayout = dynamic(() => import("@@/components/Layouts/AdminLayout"));

const Menu = ({ categories }) => {
  const { state, dispatch } = React.useContext(MainContext);

  React.useEffect(() => {
    if (state.categories.length <= 0) {
      dispatch({
        type: SET_CATEGORIES,
        payload: categories,
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Menu - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Your Menu">
        <MenuPage categories={state.categories} />
      </AdminLayout>
    </React.Fragment>
  );
};

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

  const categories = await getAllCategoriesWithItems();

  return {
    props: {
      categories,
    },
  };
};

export default Menu;
