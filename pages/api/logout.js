import admin from "@@/firebase/admin";

const handler = async (req, res) => {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      res.setHeader(
        "Set-Cookie",
        serialize("session", "", { maxAge: -1, path: "/" })
      );
      res.end(JSON.stringify({ status: "success" }));
    })
    .catch((error) => {
      res.status(401).send("catch error", error);
    });
};

export default handler;
