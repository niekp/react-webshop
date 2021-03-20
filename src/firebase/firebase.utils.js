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

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app();
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.collection('users').doc(userAuth.uid);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName: displayName,
                email: email,
                createdAt: createdAt,
                ...additionalData
            });
        } catch (error) {
            console.error('error creating user', error);
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
