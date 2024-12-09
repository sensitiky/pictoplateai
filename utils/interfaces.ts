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
  setUser: (newUser: IUser | null) => Promise<void>;
}
export interface IAuthenticationForms {
  changeTab: () => void;
}
export interface NutritionalCardProps {
  title: string;
  value: string;
}
