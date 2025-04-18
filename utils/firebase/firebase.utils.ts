import { initializeApp } from 'firebase/app'
import { User, getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArjyDkCUnalFUti98hL8QlRriuMoO_9Kc",
    authDomain: "divcommerce-8e3f1.firebaseapp.com",
    projectId: "divcommerce-8e3f1",
    storageBucket: "divcommerce-8e3f1.firebasestorage.app",
    messagingSenderId: "1045009157994",
    appId: "1:1045009157994:web:6ad57bfeae27847a53df13"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDoc = async (userAuth: User, additionalInfo = {}) => {
  const userDoc = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDoc);
  console.log(userSnapshot,'userSnapshot');
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      const details = {
        displayName, email, createdAt, ...additionalInfo
      };
      await setDoc(userDoc, details);
      return details;
    } catch (e:unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  return userSnapshot.data();
}

export const createUserFromEmailAndPassword = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const userSignInWithEmailAndPassword = async (email: string, password: string) => {
  console.log(email, password);
  return await signInWithEmailAndPassword(auth, email, password);
}