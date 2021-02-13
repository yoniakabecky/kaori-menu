import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import ItemsPage from "@@/components/ItemsPage";
import { getAllCategories } from "@@/utils/handlers";
import verifyCookie from "@@/utils/verifyCookie";

export default function Items({ categories }) {
  return (
    <React.Fragment>
      <Head>
        <title>Items - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Items">
        <ItemsPage categories={categories} />
      </AdminLayout>
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const auth = await verifyCookie(req);

  if (!auth.authenticated) {
    res.writeHead(302, { Location: "/admin" });
    res.end();

    return { props: {} };
  }

  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
};
