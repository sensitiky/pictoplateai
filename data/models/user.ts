import { IUser } from '@utils/interfaces';

class User implements IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isPremium: boolean;
  constructor(
    id: string,
    name: string,
    lastName: string,
    email: string,
    isPremium: boolean
  ) {
    (this.id = id),
      (this.name = name),
      (this.lastName = lastName),
      (this.email = email),
      (this.isPremium = isPremium);
  }
}
