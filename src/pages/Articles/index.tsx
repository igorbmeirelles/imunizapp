import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../../components/icons/back-arrow";

export function Articles() {
  return (
    <>
      <header className="gradient-purple p-4 h-[256px]">
        <div className="flex gap-2 items-center text-white">
          <Link to='/informacoes' className="pa-2"><ArrowBackIcon /></Link>
          Informações sobre vacinas
        </div>
      </header>

      <main className="bg-white -mt-[172px] gap-4 rounded-tr-[52px] pt-12 px-4">
        <h1 className="inline-block px-4 py-2 text-lg text-white bg-[#AC85D0] rounded mb-3">O que são vacinas?</h1>

        <p>
          As vacinas são produtos biológicos que estimulam a defesa do corpo
          contra alguns microrganismos (vírus e bactérias) que provocam doenças
          (UFRRJ, 2021).
        </p>

        <h1 className="inline-block px-4 py-2 text-lg text-white bg-[#AC85D0] rounded mb-3 mt-3">Sabe de onde esse termo surgiu?</h1>

        <p>
          A palavra vacina originou-se do termo “vaca”, sim isso mesmo, o animal
          que conhecemos. No século XVIII, Edward Jenner passou a pesquisar a
          varíola e percebeu que moradores de áreas rurais que contraiam cowpox
          (doença semelhante à varíola que atingia vacas) não desenvolviam uma
          forma grave da varíola humana. Então, ele fez um experimento aplicando
          uma pequena dose da cowpox em um menino chamado James Phipps e assim,
          após se recuperar da doença de forma leve, o menino não desenvolveu a
          forma grave da varíola (Instituto Butantan, 2021).
        </p>

        <h1 className="inline-block px-4 py-2 text-lg text-white bg-[#AC85D0] rounded mb-3 mt-3">Como as vacinas funcionam?</h1>

        <p>
          As vacinas ajudam o sistema de defesa do corpo a combater infecções,
          provocando uma resposta imunológica a doenças específicas. Esta
          resposta fica “gravada” e ao entrar em contato com o microrganismo
          causador da doença o sistema de defesa saberá como agir (Brasil,
          2023).
        </p>
      </main>
    </>
  );
}
