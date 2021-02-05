import dynamic from "next/dynamic";
import Head from "next/head";

const HomePage = dynamic(() => import("@@/components/HomePage"));

export default function Home() {
  return (
    <>
      <Head>
        <title>Menu | Kaori Izakaya</title>
      </Head>

      <HomePage />
    </>
  );
}
