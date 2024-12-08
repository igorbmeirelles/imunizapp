import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../../components/icons/back-arrow";

import { SearchIcon } from "../../components/icons/search";
import { useAllPrismicDocumentsByType } from "@prismicio/react";
import { useMemo } from "react";

export function Informacoes() {
  const [documents, stateInfo] = useAllPrismicDocumentsByType("informacoes");

  const data = useMemo(() => {
    return (
      documents?.map((document) => {
        const sliceInfo = document.data.slices[0].primary;

        return {
          uuid: document.uid,
          titulo: sliceInfo.titulo_botao,
          imagem: sliceInfo.icone_botao.url,
        };
      }) ?? []
    );
  }, [documents]);

  if (stateInfo.state !== "loaded") {
    return <div></div>;
  }

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
        {data.map((item) => (
          <Link
            to={`/post/${item.uuid}`}
            key={item.uuid}
            className="min-h-full p-4 shadow-md rounded-xl text-start flex justify-between flex-col gap-4"
          >
            <img
              src={item.imagem}
              alt="Icone"
              className="max-w-[54px] max-h-[54px]"
            />
            {item.titulo}
          </Link>
        ))}

        <Link
          to="/post/informacoes_duvidas_frequentes?by=type"
          className="col-span-2 p-6 flex flex-col items-center justify-center bg-[#AC85D0] text-white rounded-xl mt-4"
        >
          <SearchIcon />
          Dúvidas Frequentes
        </Link>
      </main>
    </>
  );
}
