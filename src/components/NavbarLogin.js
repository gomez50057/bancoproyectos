import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const NavbarLogin = () => {


    return (
        <nav className="NavbarLogin">
            <img src={`${imgBasePath}head.png`} alt="img_representativa" />
            <ul>
                <li><Link to="/" className=""> Banco de Proyectos </Link></li>
                <div className="NavbarLogin_inicio">
                    <li><Link to="/login" className=""> Acceder </Link></li>
                    <li><Link to="/" className=""> Registrate </Link></li>
                </div>
            </ul>
        </nav>
    );
}

export default NavbarLogin;
