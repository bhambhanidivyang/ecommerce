import { initializeApp } from 'firebase/app'
import { User, getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, NextOrObserver} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, getDocs, query} from 'firebase/firestore'
import { Category } from '../../src/interface/Category.interface';
import { Product } from '../../src/interface/Product.interface';

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

export const firebaseErrorCodes: Record<string, string> = {
  "auth/invalid-email": "The email address is badly formatted.",
  "auth/user-disabled": "The user account has been disabled by an admin.",
  "auth/user-not-found": "There is no user record corresponding to this email.",
  "auth/wrong-password": "The password is invalid or the user does not have a password.",
  "auth/email-already-in-use": "The email address is already in use by another account.",
  "auth/operation-not-allowed": "Email/password accounts are not enabled. Enable in Firebase console.",
  "auth/weak-password": "The password must be 6 characters long or more.",
  "auth/too-many-requests": "Too many unsuccessful login attempts. Try again later.",
  "auth/network-request-failed": "Network error (e.g., connection timed out).",
  "auth/internal-error": "An internal error occurred. Try again.",
  "auth/invalid-credential": "Invalid Credentials. Email or Password does not match.",
  "auth/invalid-verification-code": "The SMS verification code is invalid.",
  "auth/invalid-verification-id": "The verification ID is not valid.",
  "auth/account-exists-with-different-credential": "The account already exists with a different sign-in method.",
  "auth/credential-already-in-use": "This credential is already associated with a different user account.",
  "auth/missing-verification-code": "No verification code provided (phone auth).",
  "auth/missing-verification-id": "No verification ID provided (phone auth).",
  "auth/invalid-phone-number": "The phone number format is invalid.",
  "auth/missing-phone-number": "No phone number provided.",
  "auth/app-deleted": "The Firebase app instance was deleted.",
  "auth/requires-recent-login": "This operation is sensitive and requires recent authentication.",
  "auth/unauthorized-domain": "The domain of the app is not authorized for OAuth.",
  "auth/invalid-action-code": "The action code in the password reset or email verification link is invalid.",
  "auth/expired-action-code": "The action code has expired.",
  "auth/invalid-api-key": "The API key is invalid or missing.",
  "auth/invalid-emulator-scheme": "The emulator URL scheme is invalid.",
  "auth/popup-closed-by-user": "Restricted Access. Popup closed by user."
}


export const auth = getAuth();

export const signInWithGooglePopup = async () => await signInWithPopup(auth, provider);

export const db = getFirestore();

// Store data from JSON to firestore DB. To be used once via use effect hook from the product context. 
export const addCollectionAndDocuments = async (collectionKey: string, objects: Category[], field: "title") => {
  const collectionRef = collection(db, collectionKey); // create collection ref, pointer only for 'categories'
  const batch = writeBatch(db); // initialize a batch transaction

  // loop over all documents under the collection
  objects.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLocaleLowerCase()); // craete document ref, pointer only for 'categories/categoryname'
    batch.set(docRef, object); // set operation to be attached in the batch
  })

  // execute batch operations, collection, documents will be created at this stage, and fields will be populated
  await batch.commit();
  console.log('Done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoriesData = querySnapshot.docs.reduce((acc, category) => {
    const {title, items} = category.data();
    acc[title.toLocaleLowerCase()] = items as Product[];
    return acc;
  }, {} as {[key: string]: Product[]});

  return categoriesData;
}

export const createUserDoc = async (
  userAuth: User,
  additionalInfo: { displayName?: string } = {}
) => {
  const userDoc = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDoc);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      const details = {
        displayName: displayName || additionalInfo?.displayName || 'User',
        email,
        createdAt,
        ...additionalInfo,
      };
      await setDoc(userDoc, details);
      console.log('New user created in Firestore:', details);
      return details;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error('Error creating user document:', e.message);
      }
    }
  } else {
    const existingData = userSnapshot.data();
    console.log('Existing user data fetched from Firestore:', existingData);
    return existingData;
  }

  return null;
};

export const createUserFromEmailAndPassword = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const userSignInWithEmailAndPassword = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
}

export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback:NextOrObserver<User>) => onAuthStateChanged(auth, callback);