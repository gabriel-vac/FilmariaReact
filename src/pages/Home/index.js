import { useEffect, useState } from 'react';
import './home.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import MyLoader from '../../components/Loader'

export default function Home() {

  const [filmes, setFilmes ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function loadFilmes() {
        const response = await api.get('r-api/?api=filmes');
        setFilmes(response.data);
        setIsLoading(false);
    }

    loadFilmes();

  }, []);

  if (isLoading) {
    return (
        <div className="container">
            <div className="lista-filmes">
                <MyLoader />
                <MyLoader />
            </div>
        </div>
    )
  }
  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
            return (
                <article key={filme.id}>
                   <strong>{filme.nome}</strong>
                   <img src={filme.foto} alt={filme.nome} />
                   <Link to={`/filme/${filme.id}`}>Acessar</Link>
                </article>
            )
        } )}
      </div>
    </div>
  );
  }
