import { IUserInfo, UserContext } from "@/hooks";
import { PropsWithChildren, useState } from "react";

export const UserProvider = ({ children }: PropsWithChildren<object>) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>(
    JSON.parse(localStorage.getItem("userInfo") ?? "null") || {
      name: "",
      image: {
        raw: undefined,
        url: "",
      },
    }
  );
  const [inputName, setInputName] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target?.result;
        localStorage.setItem(
          "savedImage",
          typeof base64Image === "string" ? base64Image : ""
        );
        setUserInfo((prev) => {
          return {
            ...prev,
            image: {
              raw: file,
              url: base64Image as string,
            },
          };
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    setInputName(name);
  };

  const handleSaveInfo = () => {
    setUserInfo((prev) => {
      return {
        ...prev,
        name: inputName,
      };
    });

    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        name: inputName,
        image: {
          raw: userInfo.image.raw,
          url: userInfo.image.url,
        },
      })
    );
  };

  return (
    <UserContext.Provider
      value={{ inputName, userInfo, handleNameChange, handleSaveInfo, handleImageChange }}
    >
      {children}
    </UserContext.Provider>
  );
};
