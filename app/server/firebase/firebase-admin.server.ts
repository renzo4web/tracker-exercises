import type { App } from "firebase-admin/app";
import {
  applicationDefault,
  getApp,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import type { FirebaseApp } from "firebase/app";

let apps = getApps();

export let firebaseAdminApp: App;
export let firebase: FirebaseApp;

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
