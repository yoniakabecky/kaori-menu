import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import MenuPage from "@@/components/MenuPage";
import { getAllCategoriesWithItems } from "@@/utils/handlers";

const Menu = ({ categories }) => {
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
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
  const categories = await getAllCategoriesWithItems();

  return {
    props: {
      categories,
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Menu);
