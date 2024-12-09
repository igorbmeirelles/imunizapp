import { Link } from "react-router-dom";
import { PlaceIcon } from "../../components/icons/place";
import { Shape } from "../../components/shape";
import { SyringeSmallIcon } from "../../components/icons/syringe-small";
import { CalendarIcon } from "../../components/icons/calendar";
import { SolarPeopleIcon } from "../../components/icons/solar-people";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface IUserInfo {
  name: string;
  image: {
    raw: File | undefined;
    url: string;
  };
}
export function Home() {
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

  if (!userInfo.name) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Informações de perfil</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-3">
            <img
              src={
                userInfo.image.url ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="text-sm font-light">
                Olá, {inputName}
              </p>
              <p className="text-sm font-light">
                Bem-vindo ao Imunizapp
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                placeholder="Nome"
                value={inputName}
                onChange={handleNameChange}
              />
              <Label htmlFor="file" className="mt-4">
                Foto de perfil
              </Label>
              <Input
                id="file"
                type="file"
                placeholder="Foto de perfil"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <DialogFooter className="justify-end mt-4">
            <Button
              variant={"secondary"}
              disabled={!(inputName.length > 3)}
              onClick={handleSaveInfo}
            >
              Salvar Informações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <>
      <div>
        <header className="relative">
          <Shape />
          <div className="absolute inset-0 p-4">
            <div className="flex">
              <aside className="flex gap-4 items-center">
                <img
                  src={
                    userInfo.image.url ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  className="w-[56px] h-[56px] rounded-full shadow-md"
                />
                <div>
                  <p className="text-white text-sm font-light">
                    Olá, {userInfo.name}
                  </p>
                  <p className="text-white text-sm font-light">
                    Bem-vindo ao Imunizapp
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </header>
      </div>

      <h1 className="text-xl -mt-9 mb-2 px-4">Entre e saiba mais:</h1>
      <div className="grid grid-cols-2 gap-4 px-4">
        <Link
          to="/postos-de-vacinacao"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <PlaceIcon />
          Postos de vacinação
        </Link>
        <Link
          to="/informacoes"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <SyringeSmallIcon />
          Informações
        </Link>
        <Link
          to="/calendario"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <CalendarIcon color="#713EA2" />
          Datas de vacinação
        </Link>
        <Link
          to="/"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <SolarPeopleIcon />
          Cadastro de dependentes
        </Link>
      </div>
    </>
  );
}
