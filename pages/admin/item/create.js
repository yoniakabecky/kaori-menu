import Head from "next/head";
import React from "react";

import AdminLayout from "../../../components/AdminLayout";
import AddItemPage from "../../../components/AddItemPage";

export default function AddItem() {
  return (
    <React.Fragment>
      <Head>
        <title>Add Item - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout>
        <AddItemPage />
      </AdminLayout>
    </React.Fragment>
  );
}
