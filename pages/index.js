import dynamic from "next/dynamic";
import Head from "next/head";

import { getAllCategoriesWithItems } from "@@/utils/handlers";

const HomePage = dynamic(() => import("@@/components/HomePage"));

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Menu | Kaori Izakaya</title>
      </Head>

      <HomePage categories={categories} />
    </>
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
