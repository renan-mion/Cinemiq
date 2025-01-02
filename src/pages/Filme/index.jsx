import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import api_key from "../../services/api_key";
import ImdbLogo from "../../assets/images/imdb-logo.png";
import RTLogo from "../../assets/images/rotten-tomatoes-logo.png";
import './style.css';
import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();

    const [filme, setFilme] = useState({});
    const [loading, setLoadind] = useState({});
    const [trailer, setTrailer] = useState({});
    const [erro, setErro] = useState(false);
    const [salvos, setSalvos] = useState(() => {
        const filmesSalvos = JSON.parse(localStorage.getItem('Filmes salvos')) || [];
        return filmesSalvos || [];
    });


    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('Filmes salvos', JSON.stringify(salvos));
        console.log(JSON.parse(localStorage.getItem('Filmes salvos')));
    }, [salvos]);

    function converterData(data) {
        const datanova = new Date();
        return datanova.toLocaleDateString();
    }

    useEffect(() => {
        async function loadFilme() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: api_key,
                    language: 'pt-BR',
                    page: 1
                }
            }).then((response) => {
                setFilme(response.data);
                console.log(response.data);
            }).catch(() => {
                console.log('Filme não encontrado');
                navigate('/', { replace: true });
            })
        }

        async function loadTrailer() {
            await api.get(`movie/${id}/videos`, {
                params: {
                    api_key: api_key,
                    language: 'pt-BR',
                    page: 1
                }
            }).then((response) => {
                const resultado = response.data.results;

                if (!resultado || resultado.length === 0) {
                    setErro(true);
                } else {
                    setTrailer(resultado[0]);
                }

                console.log(erro);

            }).catch(() => {
                console.log('Trailer não encontrado');
                navigate('/', { replace: true })
            })
        }

        loadFilme();
        loadTrailer();
        setLoadind(false);
    }, [id, navigate, erro])

    if (loading) {
        return (
            <div>
                <h1>Carregando filme...</h1>
            </div>
        )
    }

    const formatarTitulo = (titulo) => {
        if (titulo)
            return titulo.toLowerCase().replaceAll(' ', '_').replaceAll(':', '').replaceAll('-', '_');
    }

    const salvarFilme = (filme) => {
        console.log(filme);
        console.log(salvos);
        console.log(salvos.indexOf(filme));
        const filmeJaSalvo = salvos.some((item) => item.id === filme.id);
        if (!filmeJaSalvo) {
            setSalvos(prevFilmes => [...prevFilmes, filme]);
            toast.success("Filme salvo com sucesso");
        } else {
            toast.warning("O filme já foi salvo");
        }
    }

    return (
        <div className="filme">
            <div className="info-filme">
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="poster" className="poster"/>
                <p>{filme.overview}</p>
                <p>Data de lançamento: {converterData(filme.release_date)}</p>
                <p>Nota: {filme.vote_average}</p>
                <div className="logo-links">
                    <Link to={`https://www.imdb.com/pt/title/${filme.imdb_id}`} target="_blank" rel="noreferrer">
                        <img src={ImdbLogo} alt="logo-IMDB" className="link-logo" />
                    </Link>
                    <Link to={`https://www.rottentomatoes.com/m/${formatarTitulo(filme.original_title)}`} target="_blank" rel="noreferrer">
                        <img src={RTLogo} alt="logo-IMDB" className="link-logo" />
                    </Link>
                </div>

                {!erro ? (
                    <Link className="link-trailer" to={'https://www.youtube.com/watch?v=' + trailer.key} target="_blank" rel="noreferrer">Trailer</Link>
                ) : (
                    <h2>Trailer não disponível</h2>
                )}

                <div className="generos-container">
                    {filme.genres && filme.genres.map((genero) => {
                        return (
                            <div key={genero.id} className="genero-filme">
                                {genero.name}
                            </div>
                        )
                    })}
                </div>
                <button className="btn-salvar" onClick={() => salvarFilme(filme)}>Salvar</button>
            </div>

        </div>
    )
}

export default Filme;