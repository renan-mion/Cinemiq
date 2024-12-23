import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MeusFilmes() {
    const salvos = JSON.parse(localStorage.getItem('Filmes salvos')) || [];
    const [erro, setErro] = useState(false);

    useEffect(() => {
        async function loadSalvos() {
            try {
                if (!salvos || salvos.length === 0) {
                    setErro(true);
                }
            } catch (error) {
                console.log(error);
            }
        }

        loadSalvos();
    }, [])

    if (erro) {
        return (
            <div>
                <h1>Nenhum filme salvo</h1>
            </div>
        )
    }

    return (
        <div className="container-pagina">
            <h1 className="titulo">Filmes Salvos</h1>

            <div className="filmes">{
                salvos.map((filme) => {
                    return (
                        <div key={filme.id} className="filme-card">
                            <p>{filme.title}</p>
                            <Link to={'/filme/' + filme.id}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="poster" /></Link>
                            <Link to={'/filme/' + filme.id} className="link-filme">Acessar</Link>
                        </div>
                    )
                })
            }</div>
        </div>
    )
}

export default MeusFilmes;