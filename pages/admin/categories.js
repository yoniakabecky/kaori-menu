import Head from "next/head";
import React from "react";

import AdminLayout from "../../components/AdminLayout";
import CategoriesPage from "../../components/CategoriesPage";

export default function Categories() {
  return (
    <React.Fragment>
      <Head>
        <title>Categories - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout>
        <CategoriesPage />
      </AdminLayout>
    </React.Fragment>
  );
}
