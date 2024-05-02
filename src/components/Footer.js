import React from 'react';
import './styles.css';
const imgBasePath = "img/";

const Footer = () => {
    return (
        <div id='footer' className="how-it-works">
            <div className="image-container">
                <img src={`${imgBasePath}footer.png`} alt="img_representativa" className="centered-image" />
            </div>
            {/* Otro contenido sobre el proyecto */}
        </div>
    );
}

export default Footer;
