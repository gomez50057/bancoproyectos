// Archivo: src/pages/Responsible/ProjectReportReact.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './ProjectReportReact.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/pdf/";

// Corrección del ícono de marcador de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const ProjectReportReact = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/proyecto/${projectId}/`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (mapRef.current) {
      const attributionControl = mapRef.current.querySelector('.leaflet-control-attribution');
      if (attributionControl) {
        attributionControl.style.display = 'none';
      }
    }
  }, [mapRef]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const position = [project.latitud, project.longitud];

  const handlePrint = () => {
    alert(
      "Por favor, configure las siguientes opciones en el panel de impresión:\n\n" +
      "Destino: Guardar como PDF\n" +
      "Tamaño del papel: Letter\n" +
      "Escala: Personalizado (118)"
    );
    window.print();
  };

  return (
    <div className="project-report">
      <div className="report-container">
        <button className="print-button" onClick={handlePrint}>Descarga</button>
        <img src={`${imgBasePath}estrella_pdf.png`} alt="Decorative Star" className="side-image" />
        <div className="rectangle_pdf">
          <div className="rectangle-content">
            <div className="section">
              <span className="label">Inversión Estimada: </span>
              <span className="value-inversion-estimada">${project.inversion_estimada}</span>
            </div>
            <div className="inline-section">
              <span className="label">Región: </span>
              <span className="value">{project.region}</span>
            </div>
            <div className="inline-section">
              <span className="label">Municipio: </span>
              <span className="value">{project.municipio}</span>
            </div>
            <div className="beneficiarios-section">
              <div className="inline-section">
                <img src={`${imgBasePath}benificiarios.png`} alt="Beneficiarios" className="image-beneficiarios" />
                <div className="beneficiarios-num">
                  <span className="value-num-be">{project.beneficiarios}</span>
                  <span className="label-num-be">Personas</span>
                </div>
              </div>
              <div className="section">
                <span className="label-txt-bene">Beneficiarios</span>
              </div>
            </div>

            <div className="beneficiarios-section">
              <div className="inline-section">
                <img src={`${imgBasePath}${project.sector}.png`} alt="Sector" className="image-beneficiarios" />
                <div className="beneficiarios-num">
                  <span className="label-sector">Sector</span>
                  <span className="value-sector">{project.sector}</span>
                </div>
              </div>
            </div>

            <div className="map-container" ref={mapRef}>
              <MapContainer center={position} zoom={30} style={{ height: "220px", width: "100%", borderRadius: "0px 0px 40px 0px"}} zoomControl={false} whenCreated={map => map.attributionControl.setPrefix('')}>
                <TileLayer
                  url="http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
                <Marker position={position}>
                  <Popup>
                    {project.project_name}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

          </div>
        </div>

        <div className="main-container">
          <div className="project-name">
            <span className="value-project-name">{project.project_name}</span>
          </div>
          <div className="project-container">
            <div className="text-container">
              <div className="section">
                <span className="label-container">Descripción del Proyecto</span>
                <span className="value-container">{project.descripcion}</span>
              </div>
              <div className="section">
                <span className="label-container">Situación Actual</span>
                <span className="value-container">{project.situacion_sin_proyecto}</span>
              </div>
            </div>
            <div className="image-container">
              <img src={`${imgBasePath}foto_proyecto.png`} alt="Proyecto" className="project-image" />
            </div>
          </div>
        </div>

        <div className="footer_pdf">
          <img src={`${imgBasePath}footer_pdf.png`} alt="Footer" className="footer-image" />
        </div>
        <img src={`${imgBasePath}pajaro.png`} alt="Decorative pajaro" className="side-imagepajaro" />
      </div>
    </div>
  );
};

export default ProjectReportReact;
