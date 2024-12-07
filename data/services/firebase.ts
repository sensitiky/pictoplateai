import { initializeApp } from '@firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@firebase/auth';
import { doc, getFirestore, setDoc } from '@firebase/firestore';
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

const saveUserUID = async (uid: string) => {
  try {
    await AsyncStorage.setItem('@userUID', uid);
  } catch (error) {
    console.error(`Error saving uuid ${error}`);
  }
};
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
): Promise<UserCredential | null> => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    await saveUserUID(user.user.uid);
    return user;
  } catch (error) {
    console.error(`Failed to login ${error}`);
    return null;
  }
};
export const registerUser = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  try {
    const registeredUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return registeredUser;
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
