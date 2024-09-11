// Archivo: src/pages/Responsible/ProjectReportReact.js
import React from 'react';
import './InvestmentReport.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/pdf/";

const ProjectReportReact = () => {
  // Simulación de los datos del proyecto
  const project = {
    project_name: 'Proyecto de Mejoramiento de Universidad',
    inversion_estimada: "5,000,000",
    cobertura: 'Regional',
    municipio: '03.Pachuca, 05.Mineral de la Reforma',
    beneficiarios: "15,000",
    sector: 'Educación',
    descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, placerat vehicula odio tellus habitasse gravida nisl, faucibus parturient mi ac arcu posuere. Dictumst pretium diam a venenatis ante mauris varius, montes ut platea ultrices ullamcorper consequat, dis hendrerit risus pulvinar nascetur velit. In hac vulputate erat fermentum mollis eget per etiam montes, lacinia dictum imperdiet ad porta turpis mauris nulla dapibus, duis platea porttitor hendrerit sed orci conubia penatibus. Turpis pretium tempor eleifend euismod fermentum dis habitant lobortis lacus odio, vivamus facilisis torquent mauris per ridiculus cursus est nascetur, pellentesque vehicula rutrum non vestibulum platea justo egestas cum. Posuere lobortis placerat aliquet bibendum maecenas mus tellus tempor iaculis convallis mi enim curae, ultrices malesuada platea suspendisse accumsan blandit dictumst nec auctor eleifend et massa. Posuere consequat curabitur at inceptos tempus nascetur accumsan maecenas, ullamcorper vestibulum.',
    situacion_sin_proyecto: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, placerat vehicula odio tellus habitasse gravida nisl, faucibus parturient mi ac arcu posuere. Dictumst pretium diam a venenatis ante mauris varius, montes ut platea ultrices ullamcorper consequat, dis hendrerit risus pulvinar nascetur velit. In hac vulputate erat fermentum mollis eget per etiam montes, lacinia dictum imperdiet ad porta turpis mauris nulla dapibus, duis platea porttitor hendrerit sed orci conubia penatibus. Turpis pretium tempor eleifend euismod fermentum dis habitant lobortis lacus odio, vivamus facilisis torquent mauris per ridiculus cursus est nascetur, pellentesque vehicula rutrum non vestibulum platea justo egestas cum. Posuere lobortis placerat aliquet bibendum maecenas mus tellus tempor iaculis convallis mi enim curae, ultrices malesuada platea suspendisse accumsan blandit dictumst nec auctor eleifend et massa. Posuere consequat curabitur at inceptos tempus nascetur accumsan maecenas, ullamcorper vestibulum.',
    prioridad: "01",
    dependencia: "Secretaría de Medio Ambiente y Recursos Naturales"
  };

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
                <p className="inline-label">Cobertura: <span className="inline-value">{project.cobertura}</span></p>

              </div>
              <div className="section">
                <span className="value">{project.municipio}</span>
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
              {/* <img src={`${imgBasePath}foto_proyecto.png`} alt="Proyecto" className="project-image" /> */}

              <div className="logoSecretaria">
                <img src={`${imgBasePath}Logotipo8.png`} alt="Logo de secretaria" />
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
