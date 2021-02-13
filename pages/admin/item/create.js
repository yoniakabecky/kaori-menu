import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import ItemInput from "@@/components/ItemInput";
import firebase from "@@/firebase/config";
import { getAllCategories } from "@@/utils/handlers";
import verifyCookie from "@@/utils/verifyCookie";

export default function AddItem({ categories }) {
  const handleAdd = async (input) => {
    const itemsRef = firebase.firestore().collection("items");

    try {
      await itemsRef.add(input);
      return true;
    } catch (err) {
      console.error("Error creating document: ", err);
      return false;
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add Item - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Add Item">
        <ItemInput categories={categories} handleSave={handleAdd} />
      </AdminLayout>
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const auth = await verifyCookie(req);

  if (!auth.authenticated) {
    res.writeHead(302, { Location: "/admin" });
    res.end();

    return { props: {} };
  }

  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
};
