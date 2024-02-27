export interface User {
  email: string;
  username: string;
  password: string;
  id: string;
  admin: boolean;
}

export type PwdUser = Omit<User, 'id'>;

export type IdUser = Omit<User, 'password'>


