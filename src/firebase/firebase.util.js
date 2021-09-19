import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyAbtspCNcZusuWLI26_DiBgrTH5pVKbCYI",
    authDomain: "rex-shop.firebaseapp.com",
    projectId: "rex-shop",
    storageBucket: "rex-shop.appspot.com",
    messagingSenderId: "859162362323",
    appId: "1:859162362323:web:8cf3fd6a6c9cadb139ef26",
    measurementId: "G-HDNKZVJSJ0"
  };

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;