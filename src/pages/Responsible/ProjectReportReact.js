// Archivo: src/pages/Responsible/ProjectReportReact.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProjectReportReact.css';

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
        <div className="rectangle">
          <div className="rectangle-content">
            <div className="section">
              <span className="label">Inversión Estimada: </span>
              <span className="value">${project.inversion_estimada}</span>
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
                <img src="/assets/images/pdf/beneficiarios.png" alt="Beneficiarios" className="imagebeneficiarios" />
                <div className="beneficiarios-num">
                  <span className="value-num">{project.beneficiarios}</span>
                  <span className="label-num">Personas</span>
                </div>
              </div>
              <div className="section">
                <span className="labeltxtbene">Beneficiarios</span>
              </div>
            </div>

            <div className="beneficiarios-section">
              <div className="inline-section">
                <img src="/assets/images/pdf/electricidad.png" alt="Sector" className="imagebeneficiarios" />
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
              <img src="/assets/images/pdf/foto_proyecto.png" alt="Proyecto" className="project-image" />
            </div>
          </div>
        </div>

        <div className="footer">
          <img src="/assets/images/pdf/footer_pdf.png" alt="Footer" className="footer-image" />
        </div>
      </div>
    </div>
  );
};

export default ProjectReportReact;
