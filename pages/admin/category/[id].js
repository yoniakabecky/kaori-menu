import Head from "next/head";
import React from "react";

import firebase from "../../../utils/firebaseConfig";
import AdminLayout from "../../../components/AdminLayout";
import CategoryInput from "../../../components/CategoryInput";
import { getCategoryById } from "../../../utils/handlers";

export default function EditCategory({ data, id }) {
  const handleUpdate = async (input) => {
    const categoriesRef = firebase.firestore().collection("categories");
    const docName = input.category.toLowerCase();

    if (docName === id) {
      try {
        await categoriesRef.doc(docName).update(input);
        return true;
      } catch (err) {
        console.error("Error updating document: ", err);
        return false;
      }
    } else {
      await deleteOldDoc();

      const doc = await categoriesRef.doc(docName).get();

      if (!doc.exists) {
        await categoriesRef.doc(docName).set(input);
        return true;
      } else {
        return false;
      }
    }
  };

  const deleteOldDoc = () =>
    firebase
      .firestore()
      .collection("categories")
      .doc(data.id)
      .delete()
      .catch((err) => console.err("Error removing old document: ", err));

  return (
    <React.Fragment>
      <Head>
        <title>Edit Category - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Edit Category">
        <CategoryInput {...data} handleSave={handleUpdate} />
      </AdminLayout>
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ query }) => {
  const data = await getCategoryById(query.id);

  return {
    props: {
      data,
      id: query.id,
    },
  };
};
