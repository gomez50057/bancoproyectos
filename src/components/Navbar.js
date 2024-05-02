import React, { useEffect, useState } from 'react';
import './styles.css'; // Importamos los estilos globales
const imgBasePath = "img/";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState("#home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section"); // Seleccionamos todas las secciones
            sections.forEach(section => {
                const top = section.offsetTop; // Posición superior de la sección
                const height = section.offsetHeight; // Altura de la sección
                if (window.pageYOffset >= top && window.pageYOffset < top + height) {
                    setActiveLink(`#${section.id}`);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <nav className="navbar">
            <img src={`${imgBasePath}head.png`} alt="img_representativa" className="floating-img" />
            <ul>
                <li><a href="#home" className={activeLink === "#home" ? "active" : ""}>Inicio</a></li>
                <li><a href="#about" className={activeLink === "#about" ? "active" : ""}>Sobre el Proyecto</a></li>
                <li><a href="#projects" className={activeLink === "#projects" ? "active" : ""}>Tablero de Proyectos</a></li>
                <li><a href="#interests" className={activeLink === "#interests" ? "active" : ""}>Páginas de Interés</a></li>
                <li><a href="#how" className={activeLink === "#how" ? "active" : ""}>Cómo Funciona</a></li>
                <li><a href="#map" className={activeLink === "#map" ? "active" : ""}>Mapa Interactivo</a></li>
                <li><a href="#footer" className={activeLink === "#footer" ? "active" : ""}>Contacto</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
