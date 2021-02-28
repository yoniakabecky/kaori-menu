import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import CategoryInput from "@@/components/CategoryInput";
import firebase from "@@/firebase/config";
import { getCategoryById } from "@@/utils/handlers";
import verifyCookie from "@@/utils/verifyCookie";

export default function EditCategory({ data, id }) {
  const handleUpdate = async (input) => {
    const categoriesRef = firebase.firestore().collection("categories");
    const docName = input.name.toLowerCase();

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

export const getServerSideProps = async (context) => {
  const auth = await verifyCookie(context);

  if (!auth.authenticated) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const data = await getCategoryById(context.query.id);

  return {
    props: {
      data,
      id: context.query.id,
    },
  };
};
