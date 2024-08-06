import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const NavbarLogin = () => {


    return (
        <nav className="NavbarLogin">
            <ul>
                <div className="NavbarLogin_img">
                    <img src={`${imgBasePath}Logotipo.webp`} alt="img_representativa" />
                    <li><Link to="/" className=""> Banco de Proyectos </Link></li>
                </div>
                <div className="NavbarLogin_inicio">
                    <div className="Navbar_circulo">
                        <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
                    </div>
                </div>
            </ul>
        </nav>
    );
}

export default NavbarLogin;
