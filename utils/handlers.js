import firebase from "@@/firebase/config";

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

export const updateDisplay = async (id, value) => {
  const itemsRef = firebase.firestore().collection("items");

  try {
    await itemsRef.doc(id).update({ display: value });
    return true;
  } catch (err) {
    console.error("Error updating document: ", err);
    return false;
  }
};

export const updateOrder = async (collection, id, value) => {
  const collectionRef = firebase.firestore().collection(collection);

  try {
    await collectionRef.doc(id).update({ order: value });
    return true;
  } catch (err) {
    console.error("Error updating document: ", err);
    return false;
  }
};
