import { atom } from "recoil";

export interface adminUser {
    admin: string
}

const defaultAdminUser: adminUser = {
    admin: ""
};

export const adminUserState = atom<adminUser>({
  key: "adminUserState",
  default: defaultAdminUser,
});
