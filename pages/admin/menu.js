import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/layouts/AdminLayout";
import MenuPage from "@@/components/pages/MenuPage";

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
