import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import base_url from '../../services/base_url';
import api_key from '../../services/api_key';
import './style.css'

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState([]);
    const [salvos, setSalvos] = useState(() => {
        const filmesSalvos = JSON.parse(localStorage.getItem('Filmes salvos')) || [];
        return filmesSalvos || [];
    });

    useEffect(() => {
        localStorage.setItem('Filmes salvos', JSON.stringify(salvos));
        console.log(JSON.parse(localStorage.getItem('Filmes salvos')));
    }, [salvos]);

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await base_url.get('movie/now_playing', {
                    params: {
                        api_key: api_key,
                        language: 'pt-BR',
                        page: 1
                    }
                })

                const resultados = response.data.results;

                setFilmes(resultados);
            } catch(error) {
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

    const salvarFilme = (filme) => {
        setSalvos(prevFilmes => [...prevFilmes, filme]);
    }

    return (
        <div>
            <h1 className="titulo-home">Filmes em alta</h1>
            <div className="filmes">
                {filmes.map((filme) => {
                    return (
                        <div key={filme.id} className="filme-card">
                            <p className="titulo-filme" alt='titulo'>{filme.title}</p>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="poster" />
                            <Link to={'/filme/' + filme.id} className="link-filme">Acessar</Link>
                            <button className="btn-salvar" onClick={() => salvarFilme(filme)}>Salvar</button>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Home;