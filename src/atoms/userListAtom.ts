import { atom } from "recoil";

export interface UsersList {
  _id: string;
  name?: string;
  location: {
    timestamp: string;
    longitude: number;
    latitude: number;
  };
  danger: boolean;
  email?: string;
  phone?: string;
}

const defaultUserList: UsersList = {
  _id: "",
  location: {
    timestamp: "",
    longitude: 123,
    latitude: 123,
  },
  danger: false,
};

export const usersListState = atom<UsersList[]>({
  key: "usersListState",
  default: [],
});
