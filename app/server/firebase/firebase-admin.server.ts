import type { App } from "firebase-admin/app";
import {
  applicationDefault,
  getApp,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let apps = getApps();

export let firebaseAdminApp: App;

if (!apps.length) {
  firebaseAdminApp = initializeApp({
    credential: applicationDefault(),
    databaseURL: process.env.FIREBASE_APPLICATION_DATABASE_URL,
  });
} else {
  firebaseAdminApp = getApp();
}

export let firestore = getFirestore(firebaseAdminApp);

export let auth = getAuth(firebaseAdminApp);
