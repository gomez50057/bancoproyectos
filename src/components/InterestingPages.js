import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const InterestingPages = () => {
    const handleNavigate = (url) => {
        window.open(url, "_blank");
    };
    return (
        <section id='interests' className="interesting-pages">
            <h2 className="interests_txt">CONOCE Y CREA <span>PROPUESTAS</span></h2>
            <div className="interests_reg">
                <div className="rectangle">
                    <p>La Unidad de Planeación y Prospectivate sugiere...</p>
                    <button onClick={() => handleNavigate("url_a")} >
                        <img src={`${imgBasePath}botton.png`} alt="Icono" className="icon" />
                        Conoce más
                    </button>
                </div>
                <div className="rectangle">
                    <p>Carga tu proyecto</p>
                    <Link to="/login" className="rectangle-button">
                        <img src={`${imgBasePath}botton.png`} alt="Icono" className="icon" />
                        Ir
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default InterestingPages;


