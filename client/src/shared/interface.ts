export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  friends: Friend[];
  views: string[];
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profileUrl?: string;
  token?: string;
}

export interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  friends?: string[];
  views?: string[];
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  profileUrl?: string;
  location?: string;
  profession?: string;
}

export interface Post {
  _id: string;
  userId: User;
  description: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  _id: string;
  userId: User;
  postId: string;
  comment: string;
  from: string;
  likes: string[];
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Reply {
  userId: User;
  from: string;
  replyAt: string;
  comment: string;
  created_At: string;
  updated_At: string;
  likes: string[];
  _id: string;
}
