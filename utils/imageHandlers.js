import firebase from "@@/firebase/config";

export const uploadFile = async (file) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(file.name);

  try {
    await fileRef.put(file);
    return file.name;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const downloadUrl = async (fileName) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(fileName);

  return fileRef
    .getDownloadURL()
    .then((url) => {
      return url;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          console.error("File doesn't exist");
          break;
        case "storage/unauthorized":
          console.error("User doesn't have permission to access the object");
          break;
        default:
          console.error("Unknown error occurred, inspect the server response");
          break;
      }
    });
};
