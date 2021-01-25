import Head from "next/head";
import React from "react";

import AdminLayout from "../../components/AdminLayout";
import MenuPage from "../../components/MenuPage";

export default function Menu() {
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
}
