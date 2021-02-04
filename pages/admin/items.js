import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import ItemsPage from "@@/components/ItemsPage";
import { getAllCategories } from "@@/utils/handlers";

function Items({ categories }) {
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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Items);
