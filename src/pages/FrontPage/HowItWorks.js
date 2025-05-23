import React from 'react';
import '../../components/styles.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const HowItWorks = () => {
    return (
        <div id='howitWorks' className="how-it-works">
            <h2>¿CÓMO FUNCIONA <span>EL BANCO DE PROYECTOS?</span></h2>
            <div className="image-container">
                <img src={`${imgBasePath}Procesos.gif`} alt="img_representativa" className="centered-image" />
            </div>
        </div>
    );
}

export default HowItWorks;

