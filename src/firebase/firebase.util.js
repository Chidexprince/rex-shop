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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); // Pass the uid in the path

  const snapShot = await userRef.get(); // Pull the data based on the uid

  if(!snapShot.exists) { // If the data doesn't exist
    const { displayName, email } = userAuth; // Destructure the displayName and email from userAuth
    const createdAt = new Date(); // get date and time

    try {
      await userRef.set({ // Create user with the parameters
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef // Return details of user created
}

if (firebase.apps.length === 0) { // To avoid re-initialization of firebase  
  firebase.initializeApp(config);
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;