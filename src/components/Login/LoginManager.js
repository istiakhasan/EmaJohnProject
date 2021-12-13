import * as firebase from 'firebase/app';
import "firebase/auth"
import firebaseConfig from './firebase.config';

import {
    signInWithEmailAndPassword,
    updateProfile,
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";

export const initializeloginframework = () => {
    firebase.initializeApp(firebaseConfig)

}

export const handlesingin = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    return signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const {displayName, photoURL, email} = user
            const singnedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,

                photo: photoURL,
                success: true

            }

            return singnedInUser

           
        })
        .catch((error) => {
        console.log(error)
        });

}

export const handlesignout = () => {

    const auth = getAuth();
    return signOut(auth)
        .then((res) => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                photo: '',
                email: '',
                success: false
            }
            return signOutUser

        })
        .catch((error) => {});
}

export const createuseremailAndPassword = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {

            const newUserInfo = res.user
            newUserInfo.error = ""
            newUserInfo.success = true

            updateUserName(name)
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message
            newUserInfo.success = false
            return newUserInfo

            // ..
        });
}

export const signinWithemailandpassword = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((res) => { 
            const newUserInfo = res.user
            newUserInfo.success = true
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.success = false
            return newUserInfo
          
        });
}
const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {displayName: name})
        .then(() => {
            console.log('user name update succesfully')
        })
        .catch((error) => {});
}