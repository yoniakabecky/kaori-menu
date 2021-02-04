import { withAuthUser, AuthAction } from "next-firebase-auth";
import Head from "next/head";
import React from "react";

import AdminLayout from "@@/components/Layouts/AdminLayout";
import CategoryInput from "@@/components/CategoryInput";
import firebase from "@@/utils/firebaseConfig";

const initInput = {
  category: "",
  description: "",
};

function AddCategory() {
  const handleAdd = async (input) => {
    const categoriesRef = firebase.firestore().collection("categories");
    const docName = input.category.toLowerCase();
    const doc = await categoriesRef.doc(docName).get();

    if (!doc.exists) {
      await categoriesRef.doc(docName).set(input);
      return true;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add Category - Admin | Kaori Izakaya</title>
      </Head>

      <AdminLayout pageTitle="Add Category">
        <CategoryInput {...initInput} handleSave={handleAdd} />
      </AdminLayout>
    </React.Fragment>
  );
}

export default withAuthUser({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AddCategory);
