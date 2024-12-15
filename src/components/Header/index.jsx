import { Link } from 'react-router-dom';
import './style.css';
import Logo from '../../assets/images/logo.png'

function Header() {
    return (
        <header>
            <img src={Logo} alt="logo"/>

            <div className='links'>
                <Link to='/'>Home</Link>
                <Link to='/'>Meus Filmes</Link>
                <Link to='/sobre'>Sobre</Link>
            </div>

        </header>
    )
}

export default Header;