// Archivo: src/pages/Responsible/ProjectReportReact.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProjectReportReact.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/pdf/";

const ProjectReportReact = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

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

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-report">
      <div className="report-container">
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
                <img src={`${imgBasePath}electricidad.png`} alt="Sector" className="image-beneficiarios" />
                <div className="beneficiarios-num">
                  <span className="label-sector">Sector</span>
                  <span className="value-sector">{project.sector}</span>
                </div>
              </div>
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
