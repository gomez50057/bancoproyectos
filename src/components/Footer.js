import React from 'react';
import './styles.css';
const imgBasePath = "img/footer/";

const Footer = () => {
    return (
        <div id='footer' className="footer">
            <div className="footer_redes">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={`${imgBasePath}facebook.png`} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={`${imgBasePath}instagram.png`} alt="Instagram" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <img src={`${imgBasePath}youtube.png`} alt="YouTube" />
                </a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                    <img src={`${imgBasePath}x.png`} alt="Example" />
                </a>
            </div>

            <div className="image-container">
                <img src={`${imgBasePath}logo_footer.png`} alt="img_representativa" />
            </div>

            <div className="footer_contacto">
                <img src={`${imgBasePath}telefono.png`} alt="img_representativa" />

                <div className="footer_contacto_txt">
                    <p><span>CONTACTO:</span></p>
                    <p><span>Tel.: 771 717 6000 ext. 0000</span></p>
                    <p>Dirección General de Proyectos, Estudios y Prospectiva</p>
                    <p><span>Unidad de Planeación y Prospectiva</span></p>
                    <p>proyectosyprospectiva@hidalgo.gob.mx</p>
                    <div className="linea_footer"></div>
                    <p>Gobierno del Estado de Hidalgo</p>
                    <p><span>www.hidalgo.gob.mx</span></p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
