import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
// const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";
const imgBasePath = "img/";

const NavbarLogin = () => {


    return (
        <nav className="NavbarLogin">
            <ul>
                <div className="NavbarLogin_img">
                    <li><Link to="/" className=""> Banco de Proyectos </Link></li>
                    <img src={`${imgBasePath}Logotipo.png`} alt="img_representativa" />
                </div>
                <div className="NavbarLogin_inicio">
                    <li><Link to="/login" className=""> Acceder </Link></li>
                    <li><Link to="/" className=""> Registrate </Link></li>
                </div>
            </ul>
        </nav>
    );
}

export default NavbarLogin;
