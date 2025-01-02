import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function MeusFilmes() {
    const [salvos, setSalvos] = useState(JSON.parse(localStorage.getItem('Filmes salvos')) || []);
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
        localStorage.setItem('Filmes salvos', JSON.stringify(salvos));
        console.log(JSON.parse(localStorage.getItem('Filmes salvos')));
    }, [salvos])

    const excluirFilme = (filme) => {
        // const index = salvos.indexOf(filme);
        // const novoSalvos = salvos.splice(index, 1);
        const novoSalvos = salvos.filter(value => value !== filme);
        setSalvos(novoSalvos);
        console.log(novoSalvos);
    }

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
                            <button className="btn-excluir" onClick={() => {excluirFilme(filme)}}>Excluir</button>
                        </div>
                    )
                })
            }</div>
        </div>
    )
}

export default MeusFilmes;