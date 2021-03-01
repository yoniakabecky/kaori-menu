import getFirebaseAdmin from "@@/firebase/admin";

const handler = async (req, res) => {
  const admin = await getFirebaseAdmin();
  if (!admin) return null;

  const sessionCookie = req.cookies.session || "";

  res.setHeader(
    "Set-Cookie",
    serialize("session", "", { maxAge: -1, path: "/" })
  );

  admin
    .auth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      res.end(JSON.stringify({ status: "success" }));
    })
    .catch((error) => {
      res.status(401).send("catch error", error);
    });
};

export default handler;
