import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowBackIcon } from "../../components/icons/back-arrow";
import {
  PrismicRichText,
  usePrismicDocumentByUID,
  usePrismicDocumentsByType,
} from "@prismicio/react";
import { useMemo } from "react";

import "./style/index.css";

export function Articles() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const type = params.get("by");
  const searchByType = type == "type" ? true : false;

  const [typeDoc, typeState] = usePrismicDocumentsByType(
    searchByType ? slug : ""
  );

  const [document, state] = usePrismicDocumentByUID("informacoes", slug ?? "");
  const text = useMemo(() => {
    return searchByType
      ? typeDoc?.results[0].data.slices[0].primary.texto_da_pagina
      : document?.data.slices[0].primary.texto_da_pagina;
  }, [document, typeDoc, searchByType]);

  if (
    (state.state !== "loaded" || typeState.state !== "loaded") &&
    !(state.state !== "failed" || typeState.state !== "failed")
  ) {
    return <div>aqui</div>;
  }

  return (
    <>
      <header className="gradient-purple p-4 h-[256px]">
        <div className="flex gap-2 items-center text-white">
          <Link to="/informacoes" className="pa-2">
            <ArrowBackIcon />
          </Link>
          Informações sobre vacinas
        </div>
      </header>

      <main className="bg-white -mt-[172px] gap-4 rounded-tr-[52px] pt-12 px-4 min-h-svh">
        <PrismicRichText field={text} />
      </main>
    </>
  );
}
