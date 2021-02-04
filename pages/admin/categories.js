import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import CategoriesPage from "@@/components/CategoriesPage";
import { getAllCategories } from "@@/utils/handlers";

function Categories({ categories }) {
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
})(Categories);
