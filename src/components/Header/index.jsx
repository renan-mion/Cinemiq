import { Link } from 'react-router-dom';

function Header() {
    return(
        <header>
            <Link to='/'>Home</Link>
            <Link to='/'>Meus Filmes</Link>
            <Link to='/sobre'>Sobre</Link>
        </header>
    )
}

export default Header;