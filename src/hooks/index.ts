import { createContext, useContext } from "react";

export interface IUserInfo {
  name: string;
  image: {
    raw: File | undefined;
    url: string;
  };
}

interface IUserContext {
  inputName: string;
  userInfo: IUserInfo;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveInfo: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserContext = createContext<IUserContext>({
  handleImageChange: () => {},
  handleSaveInfo: () => {},
  inputName: "",
  handleNameChange: () => {},
  userInfo: {
    name: "",
    image: {
      raw: undefined,
      url: "",
    },
  },
});

export const useUser = () => {
  return useContext(UserContext);
};
