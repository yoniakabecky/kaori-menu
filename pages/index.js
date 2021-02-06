import dynamic from "next/dynamic";
import Head from "next/head";

import { getAllCategories } from "@@/utils/handlers";

const HomePage = dynamic(() => import("@@/components/HomePage"));

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Menu | Kaori Izakaya</title>
      </Head>

      <HomePage firstLoad={categories} />
    </>
  );
}

export const getStaticProps = async () => {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
};
