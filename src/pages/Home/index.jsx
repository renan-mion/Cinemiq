import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import base_url from '../../services/base_url';
import api_key from '../../services/api_key';
import './style.css'

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState([]);
    const [salvos, setSalvos] = useState([]);

    useEffect(() => {
        async function loadFilmes() {
            const response = await base_url.get('movie/now_playing', {
                params: {
                    api_key: api_key,
                    language: 'pt-BR',
                    page: 1
                }
            })

            const resultados = response.data.results;

            console.log(resultados);
            setFilmes(resultados);
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
        <div className="filmes">
            {filmes.map((filme) => {
                return (
                    <div key={filme.id} className="filme-card">
                        <p className="titulo-filme" alt='titulo'>{filme.title}</p>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="poster" />
                        <Link to={'/filme/' + filme.id} className="link-filme">Acessar</Link>
                        <button className="btn-salvar">Salvar</button>
                    </div>

                )
            })}
        </div>
    )
}

export default Home;