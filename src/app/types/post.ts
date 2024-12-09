export interface Post {
  _id: string;
  id_city: string;
  id_user: string;
  username: string;
  title: string;
  content: string;
  categories: string[];
  creationDate?: Date;
  likes: number;
  likesUsers: string[];
  numComments: number;
  mediaURL?: string;
}
