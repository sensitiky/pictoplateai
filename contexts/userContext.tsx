import { ReactNode, useEffect, useState } from 'react';
import { IUser } from '../utils/interfaces';
import { UserContext } from '../utils/helpers';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc, getFirestore } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userDocRef = doc(db, 'users', authUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser(userDoc.data() as IUser);
          } else {
            console.warn('Issue finding user data');
            setUser(null);
          }

          await AsyncStorage.setItem('@userUID', authUser.uid).catch(
            console.error
          );
        } catch (error) {
          console.error('Issue obtaining user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem('@userUID').catch(console.error);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth, db]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
