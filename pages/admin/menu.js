import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import MenuPage from "@@/components/MenuPage";
import { getAllCategoriesWithItems } from "@@/utils/handlers";
import verifyCookie from "@@/utils/verifyCookie";

const Menu = ({ categories }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Menu - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Your Menu">
        <MenuPage />
      </AdminLayout>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const auth = await verifyCookie(req);

  if (!auth.authenticated) {
    res.writeHead(302, { Location: "/admin" });
    res.end();

    return { props: {} };
  }

  const categories = await getAllCategoriesWithItems();

  return {
    props: {
      categories,
    },
  };
};

export default Menu;
