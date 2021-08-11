import firebase from "firebase";

const settings = { timestampsInSnapshots: true };

const firebaseConfig = {
  apiKey: "AIzaSyA2tei_RJB8CiYhm8CQqUF_7UyUdRI8wb8",
  projectId: "beste-80688",
  databaseURL: "https://beste-80688-default-rtdb.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

export default firebase;
