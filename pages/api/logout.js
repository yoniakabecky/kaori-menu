import { serialize } from "cookie";

import admin from "@@/firebase/admin";

const handler = async (req, res) => {
  const sessionCookie = req.cookies.session || "";

  res.setHeader(
    "Set-Cookie",
    serialize("session", "", { maxAge: -1, path: "/" })
  );

  await admin
    .auth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      res.end(JSON.stringify({ status: "success" }));
    })
    .catch((error) => {
      res.status(401).send(error);
    });
};

export default handler;
