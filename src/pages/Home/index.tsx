import { Link } from "react-router-dom";
import { PlaceIcon } from "../../components/icons/place";
import { Shape } from "../../components/shape";
import { SyringeSmallIcon } from "../../components/icons/syringe-small";
import { CalendarIcon } from "../../components/icons/calendar";
import { SolarPeopleIcon } from "../../components/icons/solar-people";
import { useUser } from "@/hooks";

export function Home() {
  const { userInfo } = useUser();

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
          Agenda de vacinas
        </Link>
        <Link
          to="/"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <SolarPeopleIcon />
          Cadastro de dependentes
        </Link>
        <a
          href="https://meususdigital.saude.gov.br/login"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Logo_SUS.svg"
            className="w-[56px] h-[56px] rounded-full"
          />
          Acesse o SUS Digital
        </a>
      </div>
    </>
  );
}
