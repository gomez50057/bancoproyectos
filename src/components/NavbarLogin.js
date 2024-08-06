import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const NavbarLogin = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get('/api/current_user/');
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        fetchUsername();
    }, []);

    return (
        <nav className="NavbarLogin">
            <ul>
                <div className="NavbarLogin_img">
                    <img src={`${imgBasePath}Logotipo.webp`} alt="img_representativa" />
                    <li><Link to="/" className=""> Banco de Proyectos </Link></li>
                </div>
                <div className="NavbarLogin_inicio">
                    <div className="Navbar_circulo" title={username}>
                        <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
                    </div>
                </div>
            </ul>
        </nav>
    );
}

export default NavbarLogin;
