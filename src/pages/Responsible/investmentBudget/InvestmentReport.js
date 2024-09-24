import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './InvestmentReport.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/pdf/";
const imgLogos = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/pdf/logos/";

const ProjectReportReact = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para obtener los datos del proyecto desde la API
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/cedulas/${projectId}/`);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Error al cargar los datos del proyecto');
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handlePrint = () => {
    alert(
      "Por favor, configure las siguientes opciones en el panel de impresión:\n\n" +
      "Destino: Guardar como PDF\n" +
      "Tamaño del papel: Letter\n" +
      "Escala: Personalizado (118)"
    );
    window.print();
  };

  if (loading) {
    return <div>Cargando datos del proyecto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Aplicar formato de números con separadores de miles
  const formatNumberWithCommas = (number) => {
    return number.toLocaleString('en-US');
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
              <span className="value-inversion-estimada">
                ${formatNumberWithCommas(Number(project.inversion_presupuestada))}
              </span>
            </div>

            <div className="beneficiarios-section">
              <div className="inline-section">
                <img src={`${imgBasePath}benificiarios.png`} alt="Beneficiarios" className="image-beneficiarios" />
                <div className="beneficiarios-num">
                  <span className="value-num-be">
                    {formatNumberWithCommas(Number(project.numero_beneficiarios))}
                  </span>
                  <span className="label-num-be">Personas</span>
                </div>
              </div>
              <div className="section">
                <span className="label-txt-bene">Beneficiarios</span>
              </div>
            </div>

            <div className="beneficiarios-section">
              <div className="inline-section">
                <img src={`${imgBasePath}prioridad.png`} alt="Beneficiarios" className="image-beneficiarios" />
                <div className="beneficiarios-num">
                  <span className="value-num-be">{project.prioridad}</span>
                </div>
              </div>
              <div className="section">
                <span className="label-txt-bene">Prioridad</span>
              </div>
            </div>

            <div className="beneficiarios-section">
              <div className="inline-section">
                <p className="inline-label">
                  Cobertura: <span className="inline-value">{project.cobertura}</span>
                </p>
              </div>
              <div className="section">
                {project.cobertura === 'Regional' && (
                  <div className="value">
                    {Array.isArray(project.regiones)
                      ? project.regiones.map((region, index) => (
                        <div key={index}>{region}</div>
                      ))
                      : typeof project.regiones === 'string'
                        ? project.regiones.split(',').map((region, index) => (
                          <div key={index}>{region}</div>
                        ))
                        : null}
                  </div>
                )}
                {project.cobertura === 'Municipal' && (
                  <div className="value">
                    {Array.isArray(project.municipios)
                      ? project.municipios.map((municipio, index) => (
                        <div key={index}>{municipio}</div>
                      ))
                      : typeof project.municipios === 'string'
                        ? project.municipios.split(',').map((municipio, index) => (
                          <div key={index}>{municipio}</div>
                        ))
                        : null}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="main-container">
          <div className="project-name">
            <span className="value-project-name">{project.nombre_proyecto}</span>
          </div>
          <div className="project-container">
            <div className="text-container">
              <div className="section">
                <span className="label-container">Descripción del Proyecto</span>
                <span className="value-container">{project.descripcion_proyecto}</span>
              </div>
              <div className="section">
                <span className="label-container">Situación Actual</span>
                <span className="value-container">{project.situacion_actual}</span>
              </div>
            </div>
            <div className="image-container">
              <div className="logoSecretaria">
                <img src={`${imgLogos}${project.dependencia}.png`} alt="Logo de secretaria" />
              </div>
              <div className="inversionImg">
                <img src={`${imgBasePath}inver.png`} alt="Proyecto" />
              </div>
            </div>
          </div>
        </div>

        <div className="footer_pdf">
          <img src={`${imgBasePath}footer_pdf.png`} alt="Footer" className="footer-image" />
        </div>

        <div className="NomDependencia">
          <p>{project.dependencia}</p>
        </div>

        <img src={`${imgBasePath}pajaro.png`} alt="Decorative pajaro" className="side-imagepajaro" />
      </div>
    </div>
  );
};

export default ProjectReportReact;
