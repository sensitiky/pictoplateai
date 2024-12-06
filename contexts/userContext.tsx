import { ReactNode, useState } from 'react';
import { IUser } from '../utils/interfaces';
import { UserContext } from '../utils/helpers';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
