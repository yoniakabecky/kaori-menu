import firebase from "@@/firebase/config";
import { getURL } from "next/dist/next-server/lib/utils";

export const login = async (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      if (res?.user) return await postUserToken(await res.user.getIdToken());

      return null;
    })
    .catch((error) => ({ error: error.code }));

export const logout = async () =>
  firebase
    .auth()
    .signOut()
    .then(async (res) => {
      if (res?.user)
        return await fetch(url + "/api/logout", {
          method: "POST",
          credentials: "include",
        });

      return null;
    })
    .catch((error) => console.error(error));

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://kaori-menu-git-cors-yoniakabecky.vercel.app";

const postUserToken = async (token) => {
  const response = await fetch(url + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ token: token }),
  });

  return response.json();
};
