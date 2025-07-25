// HowItWorks.jsx
import React from 'react';
import '../../components/styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const HowItWorks = () => {
  return (
    <div id="howitWorks" className="how-it-works">
      <h2>¿CÓMO FUNCIONA <span>EL BANCO DE PROYECTOS?</span></h2>
      <div className="image-container">
        <video
          className="centered-video"
          src={`${imgBasePath}video/procesos.mp4`}
          autoPlay
          muted
          loop
          playsInline
        >
          Tu navegador no soporta el elemento <code>video</code>.
        </video>
      </div>
    </div>
  );
};

export default HowItWorks;
