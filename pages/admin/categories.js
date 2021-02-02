import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import CategoriesPage from "@@/components/CategoriesPage";
import { getAllCategories } from "@@/utils/handlers";

export default function Categories({ categories }) {
  return (
    <React.Fragment>
      <Head>
        <title>Categories - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Categories">
        <CategoriesPage categories={categories} />
      </AdminLayout>
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
