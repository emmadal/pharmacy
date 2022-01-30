import {LoginTypes} from './../types/index';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const db = firestore();

export const register = async (data: any) => {
  try {
    const {email, password, fullName, phone} = data;
    const res = await auth().createUserWithEmailAndPassword(email, password);
    if (res.user) {
      await db.collection('users').doc(res.user.uid).set({
        uid: res.user.uid,
        email: res.user.email,
        fullName: fullName,
        phoneNumber: phone,
        photoURL: res.user.photoURL,
        creationTime: res.user.metadata.creationTime,
        type: 'user',
        status: 'active',
      });
      return res.user;
    }
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return 'That email address is already in use!';
    }
    if (error.code === 'auth/invalid-email') {
      return 'That email address is invalid!';
    }
  }
};

export const login = async (data: LoginTypes) => {
  try {
    const {email, password} = data;
    const res = await auth().signInWithEmailAndPassword(email, password);
    if (res.user) {
      const doc = (await db.collection('users').doc(res.user.uid).get()).data();
      return doc;
    }
  } catch (error: any) {
    return error.message;
  }
};
