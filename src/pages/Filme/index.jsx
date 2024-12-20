import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import base_url from "../../services/base_url";
import api_key from "../../services/api_key";
import './style.css';

function Filme() {
    const { id } = useParams();

    const [filme, setFilme] = useState({});
    const [loading, setLoadind] = useState({});

    function converterData(data) {
        const datanova = new Date();
        return datanova.toLocaleDateString();
    }

    useEffect(() => {
        async function loadFilme() {
            await base_url.get(`movie/${id}`, {
                params: {
                    api_key: api_key,
                    language: 'pt-BR',
                    page: 1
                }
            }).then((response) => {
                setFilme(response.data);
                console.log(response.data);
            })
                .catch(() => {
                    console.log('Filme não encontrado');
                })
        }

        loadFilme();
        setLoadind(false);
    }, [])

    if (loading) {
        return (
            <div>
                <h1>Carregando filme...</h1>
            </div>
        )
    }

    return (
        <div className="filme">
            <div className="info-filme">
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="poster" />
                <p>{filme.overview}</p>
                <p>Data de lançamento: {converterData(filme.release_date)}</p>
                <div className="generos-container">
                    {filme.genres && filme.genres.map((genero) => {
                        return (
                            <div key={genero.id} className="genero-filme">
                                {genero.name}
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Filme;