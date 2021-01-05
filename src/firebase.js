import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD59rtadIBwi_b7i4FadORHUIH4R-5rL40",
  authDomain: "clone-54105.firebaseapp.com",
  projectId: "clone-54105",
  storageBucket: "clone-54105.appspot.com",
  messagingSenderId: "439711823129",
  appId: "1:439711823129:web:ad66769b39e02a526b8188",
  measurementId: "G-Z2QKEES9HY"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider };