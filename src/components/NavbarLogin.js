import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 
const imgBasePath = "img/";

const NavbarLogin = () => {
    

    return (
        <nav className="navbar">
            <img src={`${imgBasePath}head.png`} alt="img_representativa" className="floating-img" />
            <ul>
                
                <li><Link to="/" className=""> Banco de Proyectos </Link></li>
                <li><Link to="/login" className=""> Acceder </Link></li>
                <li><Link to="/" className=""> Registrate </Link></li>


            </ul>
        </nav>
    );
}

export default NavbarLogin;
