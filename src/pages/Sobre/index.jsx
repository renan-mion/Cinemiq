import "./style.css";
import LogoGithub from "../../assets/images/logo-github.png";
import { Link } from "react-router-dom";

function Sobre() {
    return (
        <div className="div-sobre">
            <h1>Sobre</h1>
            <p className="texto-sobre">Cinemiq é um site que permite aos usuários explorar os filmes em alta,
                acessar informações detalhadas de cada título e criar uma lista personalizada de favoritos.
                Além disso, os usuários podem adicionar ou remover filmes facilmente,
                garantindo que sua coleção esteja sempre atualizada de acordo com suas preferências.
                Esse projeto foi desenvolvido com o objetivo de aprimorar meus conhecimentos em React.js.</p>

            <p>Meu GitHub</p>
            <Link to="https://github.com/renan-mion" target="_blank" rel="noreferrer">
                <img src={LogoGithub} alt="link-github"/>
            </Link>
        </div>
    )
}

export default Sobre;