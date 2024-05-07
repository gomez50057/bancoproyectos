import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
const imgBasePath = "img/";

const Navbar = () => {
    const [scrollDirection, setScrollDirection] = useState("up");
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 10);
            setScrollDirection(currentScrollPos < prevScrollPos ? "up" : "down");
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, scrollDirection]);

    return (
        <nav className={`navbar ${visible ? 'active' : 'hidden'}`}>
            <img src={`${imgBasePath}head.png`} alt="img_representativa" className="floating-img" />
            <ul>
                <li><a href="#about">Sobre el Proyecto</a></li>
                <li><a href="#projects">Tablero de Proyectos</a></li>
                <li><a href="#howitWorks">Cómo Funciona</a></li>
                <li><a href="#map">Mapa Interactivo</a></li>
                <li><Link to="/login" className="button_acceder">Acceder</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
