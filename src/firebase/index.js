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
  const createdAt = admin.database.ServerValue.TIMESTAMP;
  firebaseApp
    .database()
    .ref("nofications")
    .child(userId)
    .push({
      title,
      body,
      type,
      createdAt,
    })
    .then((notificationRef) => {
      console.log(
        `Type ${type} Notification -> User(${userId}) at ${new Date().toUTCString()}\n${notificationRef}`
      );
    })
    .catch(console.log);
};
