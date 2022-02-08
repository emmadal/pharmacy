import {LoginTypes} from './../types/index';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
  const {email, password} = data;
  const res = await auth().signInWithEmailAndPassword(email, password);
  if (res.user) {
    const doc = await db.collection('users').doc(res.user.uid).get();
    if (doc.exists) {
      return doc.data();
    }
  }
};

export const logout = async () => {
  return await auth().signOut();
};

export const getProfile = async (uid: string) => {
  const doc = await db.collection('users').doc(uid).get();
  if (doc.exists) {
    return doc.data();
  }
};

export const updateProfile = async (user: any, data: any) => {
  await db
    .collection('users')
    .doc(user?.uid)
    .update({
      fullName: data?.fullName ?? user?.fullName,
      phoneNumber: data?.phoneNumber ?? user?.phoneNumber,
      photoURL: data?.photoURL ?? user?.photoURL,
      updatedAt: new Date().toISOString(),
    });
  return await getProfile(user?.uid);
};

export const checkAuth = () => {
  auth().onAuthStateChanged(async user => {
    await getProfile(user?.uid);
  });
};

export const uploadFile = async (data: any) => {
  const task = await storage()
    .ref('users')
    .child(`${data?.fileName}`)
    .putFile(data?.uri, {
      cacheControl: 'no-store',
    });
  if (task.state === 'success') {
    const url = await storage().ref(`users/${data?.fileName}`).getDownloadURL();
    return url;
  }
};

export const addNewAddress = async (uid: string, params: any) => {
  await db
    .collection('address')
    .doc(uid)
    .collection('all')
    .doc(`${params.id}`)
    .set(params);
  return await getMyAddress(uid);
};

export const updateAddress = async (id: string, data: any, userId: string) => {
  await db
    .collection('address')
    .doc(userId)
    .collection('all')
    .doc(`${id}`)
    .update({...data});
  return await getMyAddress(userId);
};

export const deleteAddress = async (id: string, data: any, userId: string) => {
  await db
    .collection('address')
    .doc(userId)
    .collection('all')
    .doc(`${id}`)
    .delete();
  return await getMyAddress(userId);
};

export const getMyAddress = async (uid: string) => {
  const address = await db
    .collection('address')
    .doc(uid)
    .collection('all')
    .orderBy('id', 'desc')
    .get();
  if (address.docs) {
    return address.docs.map(doc => doc.data());
  }
};

export const reverseGeocoding = async (lat: number, lng: number) => {
  const key = 'pk.47b1f92837bbd696ccd8a7e0a25a492f';
  const url = `https://eu1.locationiq.com/v1/reverse.php?key=${key}&lat=${lat}&lon=${lng}&format=json`;
  const params = {
    method: 'GET',
    redirect: 'follow',
  };
  const req = await fetch(url, params);
  if (req.status === 200) {
    return await req.text();
  }
};
