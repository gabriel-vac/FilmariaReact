import { useEffect, useState } from "react";
import "./filme.css";
import api from "../../services/api";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function Filme() {
  const { id } = useParams();
  const history = useHistory();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      const response = await api.get("r-api/?api=filmes/" + id);

      if (response.data.length === 0) {
        //Tentou acessar com ID que não existe, redireciono para Home
        history.replace("/");
        return; //Não quero que continue executando daqui para baixo
      }

      setFilme(response.data);
      setLoading(false);
    }

    loadFilme();

    return () => {
      console.log("COMPONENTE DESMONTADO");
    };
  }, [history, id]);

  function salvaFilme() {
    const minhaLista = localStorage.getItem("filmes");
    //Se não tiver minha lista ele cria um array vazio
    let filmesSalvos = JSON.parse(minhaLista) || [];

    //Se tiver algum filme salvo com esse mesmo id precisa ignorar...
    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    ); //se for igual vai devolver true se não false

    if (hasFilme) {
      toast.info("Você já possui este filme salvo.");
      return; //para a execução
    }

    filmesSalvos.push(filme);
    localStorage.setItem("filmes", JSON.stringify(filmesSalvos));
    toast.success(`${filme.nome} foi adicionado a sua lista de filmes salvos.`);
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando filme...</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1> {filme.nome} </h1>
      <img src={filme.foto} alt={filme.nome} />
      <h3>Sinopse</h3>
      {filme.sinopse}

      <div className="botoes">
        <button onClick={salvaFilme}>Salvar</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}
            target="blank"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
