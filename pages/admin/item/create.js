import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import ItemInput from "@@/components/ItemInput";
import firebase from "@@/firebase/config";
import { MainContext } from "@@/context/MainContext";
import verifyCookie from "@@/utils/verifyCookie";
import { UPDATE_ITEMS } from "@@/context/types";
import { getItemsByCategory } from "@@/utils/handlers";

export default function AddItem() {
  const { state, dispatch } = React.useContext(MainContext);

  const handleAdd = async (input) => {
    const itemsRef = firebase.firestore().collection("items");

    const index = state.categories.findIndex(
      (category) => category.id === input.category
    );
    const order = state.categories[index].items.length + 1;

    try {
      await itemsRef.add({
        ...input,
        order,
      });

      const newItems = await getItemsByCategory(input.category);

      dispatch({
        type: UPDATE_ITEMS,
        payload: {
          category: input.category,
          items: newItems,
        },
      });

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
        <ItemInput categories={state.categories} handleSave={handleAdd} />
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

  return { props: {} };
};
