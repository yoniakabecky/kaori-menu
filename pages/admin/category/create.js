import Head from "next/head";
import React from "react";

import AdminLayout from "../../../components/AdminLayout";
import AddCategoryPage from "../../../components/AddCategoryPage";

export default function AddCategory() {
  return (
    <React.Fragment>
      <Head>
        <title>Add Category - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout>
        <AddCategoryPage />
      </AdminLayout>
    </React.Fragment>
  );
}
