export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user" | undefined;
}

export interface IUserLogin {
  email: string;
  password: string;
}
