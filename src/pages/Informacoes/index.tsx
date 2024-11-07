import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../../components/icons/back-arrow";
import { PlaceIcon } from "../../components/icons/place";
import { GameIcon } from "../../components/icons/game";
import { PregnantIcon } from "../../components/icons/pregnant";
import { BuildingIcon } from "../../components/icons/building";
import { ElderlyIcon } from "../../components/icons/elderly";
import { TravelerIcon } from "../../components/icons/traveler";
import { SearchIcon } from "../../components/icons/search";

export function Informacoes() {
  return (
    <>
      <header className="gradient-purple p-4 h-[256px]">
        <div className="flex gap-2 items-center text-white">
          <Link to="/">
            <ArrowBackIcon />
          </Link>
          Informações sobre vacinas
        </div>
      </header>
      <main className="bg-white -mt-[172px] gap-4 rounded-tr-[52px] pt-12 grid grid-cols-2 px-4">
        <Link
          to="/"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <PlaceIcon />
          Crianças
        </Link>
        <Link
          to="/"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <GameIcon />
          Adolescentes
        </Link>
        <Link
          to="/"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <PregnantIcon />
          Gestantes
        </Link>
        <Link
          to="/"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <BuildingIcon />
          Trabalhador
        </Link>
        <Link
          to="/"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <ElderlyIcon />
          Idosos
        </Link>
        <Link
          to="/"
          className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
        >
          <TravelerIcon />
          Viajantes
        </Link>

        <Link
          to="/post/duvidas-frequentes"
          className="col-span-2 p-6 flex flex-col items-center justify-center bg-[#AC85D0] text-white rounded-xl mt-4"
        >
          <SearchIcon />
          Dúvidas Frequentes
        </Link>
      </main>
    </>
  );
}
