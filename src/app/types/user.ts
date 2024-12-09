export interface User {
  _id?: string;
  id_city: string;
  followers?: string[];
  following?: string[];
  username: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  birthdate: Date;
  role?: string;
  status?: string;
  profilePic?: string;
  bio?: string;
  numFollowers?: number;
  numFollowing?: number;
  joinDate?: Date;
}
