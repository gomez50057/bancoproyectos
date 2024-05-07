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

                <div className="footer_contacto_txt">
                    <div className="footer_contacto_ico">
                        <img src={`${imgBasePath}telefono.png`} alt="img_representativa" />
                        <div>
                            <p><span>CONTACTO:</span></p>
                            <p><span>Tel.: 771 717 6000 ext. 0000</span></p>
                        </div>
                    </div>

                    <p>Coordinación General De Planeación Y Proyectosa</p>
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
