import firebase from "@@/firebase/config";

export const login = async (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      if (res?.user) return await postUserToken(await res.user.getIdToken());

      return null;
    })
    .catch((error) => ({ error }));

export const logout = async () =>
  firebase
    .auth()
    .signOut()
    .then(async () => {
      return await fetch(url + "/api/logout", {
        method: "POST",
        credentials: "include",
      });
    })
    .catch((error) => console.error(error));

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://kaori-menu.vercel.app";

const postUserToken = async (token) => {
  const response = await fetch(url + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });

  return response.json();
};
