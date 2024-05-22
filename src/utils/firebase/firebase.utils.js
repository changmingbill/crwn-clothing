import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAVpAbnJMEdTr7X0_ggEEA3YrYZWOo3WFw",
  authDomain: "crwn-clothing-db-d18b8.firebaseapp.com",
  projectId: "crwn-clothing-db-d18b8",
  storageBucket: "crwn-clothing-db-d18b8.appspot.com",
  messagingSenderId: "303624667855",
  appId: "1:303624667855:web:fdd4dcfad5e374e800edba"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
//providers such as google facebook ...
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
//identical user sign in again uses this function
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey, 
  objectToAdd
  ) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  // await Promise.reject(new Error('new error woops'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //     const {title, items} = docSnapshot.data();
  //     acc[title.toLowerCase()] = items;
  //     return acc;
  // }, {});
  // return categoryMap;
}


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => 
{
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  
  const userSnapshot = await getDoc(userDocRef);
  console.log("🚀 ~ userSnapshot:", userSnapshot)
//userSnapshot not exist then create a new one
  if (!userSnapshot.exists()) {
    console.log("🚀 ~ userSnapshot:", userSnapshot)
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  console.log("🚀 ~ userSnapshot:", userSnapshot);
  return userSnapshot;
};
  

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });

}

/* 
{
  next: callback,
  error: errorCallback,
  completed: completeCallback
}
*/