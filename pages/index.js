import Head from "next/head";
import React from "react";

import HomePage from "@@/components/HomePage";
import { getAllCategoriesWithItems } from "@@/utils/handlers";

export default function Home({ categories }) {
  return (
    <React.Fragment>
      <Head>
        <title>Menu | Kaori Izakaya</title>
      </Head>

      <HomePage categories={categories} />
    </React.Fragment>
  );
}

export const getServerSideProps = async () => {
  const categories = await getAllCategoriesWithItems();

  return {
    props: {
      categories,
    },
  };
};
