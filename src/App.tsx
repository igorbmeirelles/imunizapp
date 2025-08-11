import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { HomeIcon } from "./components/icons/home";
import { LocationIcon } from "./components/icons/location";
import { SyringeIcon } from "./components/icons/syringe";
import { CalendarIcon } from "./components/icons/calendar";
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
import { useUser } from "./hooks";
import { CircleHelpIcon, ChartNoAxesCombinedIcon, UsersIcon } from "lucide-react";

function App() {
  const {
    userInfo,
    inputName,
    handleNameChange,
    handleImageChange,
    handleSaveInfo,
  } = useUser();

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
              <p className="text-sm font-light">Olá, {inputName}</p>
              <p className="text-sm font-light">Bem-vindo ao Mais Vacinas</p>
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
      <Outlet />
      <div className="mt-[120px]"></div>
      <div className="bottom-0 flex fixed w-full px-4 bg-gray-100">
        <Link to="/" className="p-4 flex-grow">
          <HomeIcon className="mx-auto" />
        </Link>

        <Link to="cobertura" className="p-4 flex-grow">
          <ChartNoAxesCombinedIcon className="mx-auto" />
        </Link>

        <Link
          to="/informacoes"
          className="bg-syringe-gradient rounded-full h-[72px] w-[72px] -mt-8 flex items-center justify-center shadow"
        >
          <SyringeIcon className="mx-auto" />
        </Link>

        <Link to="/post/sobre" className="p-4 flex-grow">
          <UsersIcon className="mx-auto" />
        </Link>
        <Link to="/post/curiosidades" className="p-4 flex-grow">
          <CircleHelpIcon className="mx-auto" />
        </Link>
      </div>
    </>
  );
}

export default App;
