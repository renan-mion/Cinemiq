import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Filme from './pages/Filme';
import MeusFilmes from './pages/MeusFilmes';
import Sobre from './pages/Sobre';
import Header from './components/Header';
import Erro from './pages/Erro';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filme/:id' element={<Filme />} />
                <Route path='meus-filmes' element={<MeusFilmes />} />
                <Route path='sobre' element={<Sobre/>} />
                <Route path='*' element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;