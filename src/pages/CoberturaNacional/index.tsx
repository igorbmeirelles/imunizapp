import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CoberturaNacional() {
  const navigate = useNavigate();
  useEffect(() => {
    window.open(
      `https://infoms.saude.gov.br/extensions/SEIDIGI_DEMAS_VACINACAO_CALENDARIO_NACIONAL_COBERTURA_RESIDENCIA/SEIDIGI_DEMAS_VACINACAO_CALENDARIO_NACIONAL_COBERTURA_RESIDENCIA.html`,
      "_blank"
    );

    navigate("/");
  });
  return <></>;
}
