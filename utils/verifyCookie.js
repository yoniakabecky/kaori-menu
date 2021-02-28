import { parse } from "cookie";

import admin from "@@/firebase/admin";
import { logout } from "./authHandlers";

const verifyCookie = async ({ req }) => {
  let user = "";
  let authenticated = false;

  const cookies = parse(req.headers?.cookie || "");

  if (cookies.session) {
    await admin
      .auth()
      .verifySessionCookie(cookies.session, true)
      .then((decodedClaims) => {
        authenticated = true;
        user = decodedClaims.email;
      })
      .catch(async (error) => {
        await logout();
      });
  }

  return { authenticated, user };
};

export default verifyCookie;
