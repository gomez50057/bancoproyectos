import React from 'react';
import './styles.css';
const imgBasePath = "img/";


const InterestingPages = () => {
    return (
        <section id='interests' className="interesting-pages">
            <h2>TABLERO DE <span>PROYECTOS</span></h2>
            <div className="interests_reg">
                <div className="rectangle">
                    <p>La Unidad de Planeación y Prospectivate sugiere...</p>
                    <button>                       
                        <img src={`${imgBasePath}botton.png`} alt="Icono" className="icon" />
                        Conoce más
                    </button>
                </div>
                <div className="rectangle">
                    <p>Carga tu proyecto</p>
                    <button>                       
                        <img src={`${imgBasePath}botton.png`} alt="Icono" className="icon" />
                        ir
                    </button>
                </div>
            </div>
        </section>
    );
}

export default InterestingPages;


