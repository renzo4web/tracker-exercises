// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-socials";
import { sessionStorage } from "~/services/session.server";
import { auth, firestore } from "../server/firebase/firebase-admin.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

let token;

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    callbackURL: `/auth/google/callback`,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    let user;

    try {
      user = await auth.getUserByEmail(profile._json.email);
    } catch (e: any) {
      if (e?.code === "auth/user-not-found") {
        user = await auth.createUser({
          ...profile._json,
        });

        await firestore
          .doc(`users/${user.uid}`)
          .set({ email: profile._json.email });
      }
    } finally {
      return { ...profile, uid: user?.uid };
    }
  }
);

export let authenticator = new Authenticator<any>(sessionStorage, {
  sessionKey: token,
});

// Tell the Authenticator to use the form strategy
authenticator.use(googleStrategy);
