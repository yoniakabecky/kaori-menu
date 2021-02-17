import { serialize } from "cookie";

import admin from "@@/firebase/admin";

const handler = async (req, res) => {
  const idToken = req.body.token;

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  if (req.method === "POST") {
    await admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedIdToken) => {
        // Only process if the user just signed in in the last 15 minutes.
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 15 * 60) {
          return admin.auth().createSessionCookie(idToken, { expiresIn });
        }
        res.status(401).send("Recent sign in required!");
      })
      .then(
        (sessionCookie) => {
          const options = {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === "true",
            path: "/",
            sameSite: "none",
          };

          res.setHeader(
            "Set-Cookie",
            serialize("session", sessionCookie, options)
          );

          res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
          res.status(401).send("Unauthorized request");
        }
      );
  }
};

export default handler;
