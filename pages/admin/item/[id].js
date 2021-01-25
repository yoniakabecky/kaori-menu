import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/layouts/AdminLayout";
import ItemInput from "@@/components/ItemInput";
import firebase from "@@/utils/firebaseConfig";
import { getAllCategories, getItemById } from "@@/utils/handlers";

export default function EditItem({ data, categories, id }) {
  const handleUpdate = async (input) => {
    const itemsRef = firebase.firestore().collection("items");

    try {
      await itemsRef.doc(id).update(input);
      return true;
    } catch (err) {
      console.error("Error updating document: ", err);
      return false;
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Edit Item - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Edit Item">
        <ItemInput
          data={data}
          categories={categories}
          handleSave={handleUpdate}
        />
      </AdminLayout>
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ query }) => {
  const data = await getItemById(query.id);
  const categories = await getAllCategories();

  return {
    props: {
      data,
      categories,
      id: query.id,
    },
  };
};
