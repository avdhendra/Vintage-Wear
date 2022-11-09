// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
  } from 'firebase/auth';
import{
    getFirestore,
    doc,
  getDoc,
    setDoc,collection,writeBatch, query, getDocs
} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4A-v3DPkT5GVAelOPhyw-QETWYnE2OqU",
  authDomain: "vintage-wear-7e7fc.firebaseapp.com",
  projectId: "vintage-wear-7e7fc",
  storageBucket: "vintage-wear-7e7fc.appspot.com",
  messagingSenderId: "930503927639",
  appId: "1:930503927639:web:8ae9c9c6445a1cfb2e4012"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionkey, objectToAdd) => {
  const collectionRef = collection(db, collectionkey)
  const batch = writeBatch(db)
  //for transaction in db
  objectToAdd.forEach((object) => {
    if (object.title) {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
     
    } else if (object.name) {
    const docRef = doc(collectionRef, object.name.toLowerCase());
    batch.set(docRef, object);
      
     }
    
    
  })
  await batch.commit();
  console.log('done')
}
// export const AddDirectoryDocument = async (collectionkey, objectToAdd)=>{
//   const collectionRef = collection(db, collectionkey)
//   const batch = writeBatch(db)
//   //for transaction in db
//   const docRef = doc(collectionRef, objectToAdd)
//   batch.set(docRef, objectToAdd);
//   await batch.commit();
//   console.log('done direct')
// }
export const getCategoriesAndDocuments = async () => { 
  const collectionRef = collection(db, 'categories')
  const queryFromDatabase = query(collectionRef)
  const querySnapshot = await getDocs(queryFromDatabase)
  return querySnapshot.docs.map(docSnapshot=>docSnapshot.data())
  //   .reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data()
  //   acc[title.toLowerCase()] = items
  //   return acc;
  // }, {})
  // return categoryMap
}

export const getDirectoryDocument = async () => {
  const collectionRef = collection(db, 'directory')
  const queryFromDatabase = query(collectionRef)
  const querySnapshot = await getDocs(queryFromDatabase)
    return  querySnapshot.docs.map(docSnapshot=>docSnapshot.data())
    //.reduce((acc, docSnapshot) => {
  //   const {name,items} = docSnapshot.data()
    
  //   acc[name.toLowerCase()] = items
  //   return acc
  // }, {})
 
  //return DirectoryMap

}








export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation={}
) => {
  
  if (!userAuth) return;

 
  const userRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
        
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password,displayName) => {
  if (!email || !password) return;

  createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
   
    return await updateProfile(auth.currentUser, { displayName })
    
   })
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser=async()=>await signOut(auth)
export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback)