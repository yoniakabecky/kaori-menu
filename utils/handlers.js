import firebase from "./firebaseConfig";

export const getAllCategories = async () => {
  const snapshot = await firebase
    .firestore()
    .collection("categories")
    .orderBy("order")
    .get();

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

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => a.order - b.order);
};

export const getAllCategoriesWithItems = async () => {
  const categories = await getAllCategories();

  return Promise.all(
    categories.map(async (category) => ({
      items: await getItemsByCategory(category.id),
      ...category,
    }))
  );
};

export const signIn = async (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => (res?.user ? true : null))
    .catch((error) => ({ error: error.code }));

export const signOut = async () =>
  firebase
    .auth()
    .signOut()
    .catch((error) => console.error(error));
