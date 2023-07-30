const { getEnv } = require("../config");
const colors = require("colors");

const admin = require("firebase-admin");

module.exports.firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: getEnv(FIREBASE_PROJECT_ID),
    privateKey: getEnv(FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")),
    clientEmail: getEnv(FIREBASE_CLIENT_EMAIL),
  }),
  databaseURL: getEnv(FIREBASE_DATABASE_URL),
});

module.exports.createNotification = ({ userId, title, body, type }) => {
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
        colors.cyan.bold(
          `\n+ Type ${type} Notification -> User(${userId}) at ${new Date().toUTCString()}\n${notificationRef}`
        )
      );
    })
    .catch(console.log);
};
