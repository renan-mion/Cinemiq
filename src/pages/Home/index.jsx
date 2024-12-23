import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';
import api_key from '../../services/api_key';
import './style.css'

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await api.get('movie/now_playing', {
                    params: {
                        api_key: api_key,
                        language: 'pt-BR',
                        page: 1
                    }
                })

                const resultados = response.data.results;

                setFilmes(resultados);
            } catch (error) {
                console.log("Erro ao carregar filmes: ", error);
            }
        }

        loadFilmes();
        setLoading(false);

    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container-pagina">
            <h1 className="titulo">Filmes em alta</h1>
            <div className="filmes">
                {filmes.map((filme) => {
                    return (
                        <div key={filme.id} className="filme-card">
                            <p className="titulo-filme" alt='titulo'>{filme.title}</p>
                            <Link to={'/filme/' + filme.id}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="poster"/></Link>
                            <Link to={'/filme/' + filme.id} className="link-filme">Acessar</Link>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Home;