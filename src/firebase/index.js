import { config } from "dotenv";
import admin from "firebase-admin";

config();

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const createNotification = ({ userId, title, body, type }) => {
  firebaseApp
    .database()
    .ref("nofications")
    .child(userId)
    .push({
      title,
      body,
      type,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    })
    .then((notificationRef) => {
      console.log(notificationRef);
    });
};
