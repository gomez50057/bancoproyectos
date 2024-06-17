import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
// const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";
const imgBasePath = "img/";

const Navbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(currentScrollPos < scrollPosition || currentScrollPos < 10);
            setScrollPosition(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollPosition]);

    return (
        <nav className={`navbar ${visible ? 'active' : 'hidden'} ${scrollPosition > 100 ? 'scrolled' : ''}`}>
            <ul>
            <img src={`${imgBasePath}Logotipo.png`} alt="img_representativa" />

                <li><a href="#about">Sobre el Proyecto</a></li>
                <li><a href="#projects">Tablero de Proyectos</a></li>
                <li><a href="#howitWorks">Cómo Funciona</a></li>
                {/* <li><a href="#map">Mapa Interactivo</a></li> */}
                <li><Link to="/login" className="button_acceder">Acceder</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
