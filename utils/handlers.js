import firebase from "./firebaseConfig";

export const getAllCategories = async () => {
  const snapshot = await firebase.firestore().collection("categories").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getCategoryById = async (id) => {
  const res = await firebase.firestore().collection("categories").doc(id).get();

  return res.data();
};

export const getItemById = async (id) => {
  const res = await firebase.firestore().collection("items").doc(id).get();

  return res.data();
};

export const getItemsByCategory = async (category) => {
  const snapshot = await firebase
    .firestore()
    .collection("items")
    .where("category", "==", category)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
