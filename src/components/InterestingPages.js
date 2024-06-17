import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const InterestingPages = () => {
   
    return (
        <section id='interests' className="interesting-pages">
            <h2 className="interests_txt">CONOCE Y CREA <span>PROPUESTAS</span></h2>
            <div className="interests_reg">
                <div className="rectangle">
                    <p>Conoce los proyectos de tu localidad</p>
                    <Link to="/table" className="rectangle-button">
                        <img src={`${imgBasePath}botton.webp`} alt="Icono" className="icon" />
                        <p>Descubre mas...</p>
                    </Link>
                </div>
                <div className="rectangle">
                    <p>Carga tu proyecto</p>
                    <Link to="/login" className="rectangle-button">
                        <img src={`${imgBasePath}botton.webp`} alt="Icono" className="icon" />
                        <p>Se parte del futuro</p>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default InterestingPages;


