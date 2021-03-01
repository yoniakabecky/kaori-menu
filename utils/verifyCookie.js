import { parse } from "cookie";

import getFirebaseAdmin from "@@/firebase/admin";

const verifyCookie = async (req) => {
  const admin = await getFirebaseAdmin();
  if (!admin) return null;

  let email = "";
  let authenticated = false;

  const cookies = parse(req.headers?.cookie || "");

  if (cookies.session) {
    await admin
      .auth()
      .verifySessionCookie(cookies.session, true)
      .then((decodedClaims) => {
        authenticated = true;
        email = decodedClaims.email;
      })
      .catch(() => {
        authenticated = false;
      });
  }

  return { authenticated, email };
};

export default verifyCookie;
