import { createContext } from 'react';
import { UserContextProps } from '@utils/interfaces';

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: true,
  setUser: async () => Promise.resolve(),
});
