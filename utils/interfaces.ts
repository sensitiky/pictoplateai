export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isPremium: boolean;
}
export interface UserContextProps {
  user: IUser | null;
  loading: boolean;
}
