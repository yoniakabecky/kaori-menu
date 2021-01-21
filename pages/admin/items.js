import Head from "next/head";
import React from "react";

import AdminLayout from "../../components/AdminLayout";
import ItemsPage from "../../components/ItemsPage";

export default function Items() {
  return (
    <React.Fragment>
      <Head>
        <title>Items - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout>
        <ItemsPage />
      </AdminLayout>
    </React.Fragment>
  );
}
