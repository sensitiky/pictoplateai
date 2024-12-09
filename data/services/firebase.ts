import { initializeApp } from '@firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '@utils/interfaces';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore();

const removeUserUID = async () => {
  try {
    await AsyncStorage.removeItem('@userUID');
  } catch (error) {
    console.error(`Error removing uuid ${error}`);
  }
};
export const saveUser = async (user: IUser): Promise<boolean> => {
  try {
    const userDocRef = doc(database, 'users', user.id);

    const userData = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isPremium: false,
    };

    await setDoc(userDocRef, userData);
    return true;
  } catch (error) {
    console.error(`Failed to save user ${error}`);
    return false;
  }
};
export const loginUser = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    const userDocRef = doc(database, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as IUser;
      userData.id = uid;
      await AsyncStorage.setItem('@userData', JSON.stringify(userData));
      return userData;
    } else {
      console.error('No such user document!');
      return null;
    }
  } catch (error) {
    console.error(`Failed to login ${error}`);
    return null;
  }
};
export const registerUser = async (
  userInfo: IUser,
  password: string
): Promise<IUser | null> => {
  try {
    const registeredUser = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      password
    );
    const uid = registeredUser.user.uid;
    userInfo.id = uid;

    const userDocRef = doc(database, 'users', uid);
    await setDoc(userDocRef, userInfo);

    await AsyncStorage.setItem('@userData', JSON.stringify(userInfo));
    return userInfo;
  } catch (error) {
    console.error(`Failed to register ${error}`);
    return null;
  }
};
export const logoutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    await removeUserUID();
    console.log('Logout succesfully');
  } catch (error) {
    console.error(`Error in logout ${error}`);
    return error;
  }
};
