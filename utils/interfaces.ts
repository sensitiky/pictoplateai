import React from 'react';

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
export interface IAuthenticationForms {
  changeTab: () => void;
}
