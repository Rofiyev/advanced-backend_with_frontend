export interface IPost {
  id: string;
  title: string;
  description: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    email: string;
  };
}

export interface IUserPostAction {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  id: string;
  accessToken: string;
  refreshToken: string;
  isActivated: boolean;
}

export type IUseSheet = {
  open: boolean;
  setOpen: () => void;
};
