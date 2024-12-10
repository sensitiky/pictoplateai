export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isPremium: boolean;
  analysisCount: number;
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
export interface PurchaseSubscriptionProps {
  visible: boolean;
  onClose: () => void;
}
export interface FAQProps {
  visible: boolean;
  onClose: () => void;
}
