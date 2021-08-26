import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyAUPn40DxXdnC--didTM54PHKIx2XqENs0",
    authDomain: "nextjsblogquit.firebaseapp.com",
    projectId: "nextjsblogquit",
    storageBucket: "nextjsblogquit.appspot.com",
    messagingSenderId: "242437428",
    appId: "1:242437428:web:f943bc07a830af36d96961"
  };

  

  if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

  export{auth,db,storage,serverTimestamp}

