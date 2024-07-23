import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './ClientPanel.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const Card = ({ onClick, title, imgSrc }) => (
  <div className="e-card playing" onClick={onClick}>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="infotop">
      <img src={imgSrc} alt={title} className="card-image" />
      <br />
      {title}
      <br />
    </div>
  </div>
);

const ClientPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="client-panel-container">
      <Navbar />
      <div className="client-panel-content">
        <div className="card-container">
          <Card 
            onClick={() => navigate('/dependencia')} 
            title="Agregar Proyecto" 
            imgSrc={`${imgBasePath}consultar.webp`} 
          />
          <Card 
            onClick={() => navigate('/consulta')} 
            title="Consultar Proyecto" 
            imgSrc={`${imgBasePath}agregar.webp`} 
          />
        </div>
      </div>
    </div>
  );
};

export default ClientPanel;
