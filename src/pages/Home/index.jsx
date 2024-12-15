import { useState, useEffect } from "react";
import axios from "axios";
import base_url from '../../services/base_url';
import api_key from '../../services/api_key';

function Home() {
    const [filmes, setFilmes] = useState([]);

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

    }, [])

    return(
        <div className="filmes">
            {filmes.map((filme) => {
                return (
                    <div key={filme} className="filme-card">
                        <h1 className="titulo-filme">{filme.title}</h1>
                    </div>
                    
                )
            })}
        </div>
    )
}

export default Home;