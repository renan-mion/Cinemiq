import { Link } from "react-router-dom";

function MeusFilmes() {
    const salvos = JSON.parse(localStorage.getItem('Filmes salvos'));

    return (
        <div>
            <h1 className="titulo">Filmes Salvos</h1>

            <div className="filmes">{
                salvos.map((filme) => {
                    return (
                        <div key={filme.id} className="filme-card">
                            <p>{filme.title}</p>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="poster" />
                            <Link to={'/filme/' + filme.id} className="link-filme">Acessar</Link>
                        </div>
                    )
                })
            }</div>
        </div>
    )
}

export default MeusFilmes;