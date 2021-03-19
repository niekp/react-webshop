import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD1joeTFbp2Ig9o2MO9Cgu_vcQTay52cyo",
    authDomain: "react-webshop-afa73.firebaseapp.com",
    projectId: "react-webshop-afa73",
    storageBucket: "react-webshop-afa73.appspot.com",
    messagingSenderId: "797260358409",
    appId: "1:797260358409:web:a7b56c1efdb164399469d8"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
