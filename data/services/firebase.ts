import { firebaseConfig } from '@constants/config';
import { initializeApp } from '@firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '@utils/interfaces';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore();

const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('@userData');
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
export const updateUser = async (
  userId: string,
  updatedFields: Partial<IUser>
): Promise<boolean> => {
  try {
    const userDocRef = doc(database, 'users', userId);
    await updateDoc(userDocRef, updatedFields);
    return true;
  } catch (e) {
    console.error(e);
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
  try {
    await signOut(auth);
    await removeUserData();
    console.log('Logout succesfully');
  } catch (error) {
    console.error(`Error in logout ${error}`);
    return error;
  }
};
