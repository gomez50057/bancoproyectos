import React from 'react';
import './ClientPanel.css'; // Crear archivo de estilo para el tooltip
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const Tooltip = ({ id, text }) => {
    return (
        <span id={id} className="tooltip-icon">
            <img src={`${imgBasePath}alerta.png`} alt="tooltip icon" className="tooltip-image" />
            <span className="tooltip-text">{text}</span>
        </span>
    );
};

export default Tooltip;
