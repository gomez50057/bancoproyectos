import React, { useEffect, useState } from 'react';
import './styles.css';

const imgBasePath = "img/";

const About = () => {
  const [registeredProjects, setRegisteredProjects] = useState(0);

  useEffect(() => {
    // Define la cantidad de anteproyectos registrados (en este caso 200)
    const totalProjects = 200;
    // Define la velocidad de conteo rápida y lenta
    const fastSpeed = 5; // actualización rápida de los números
    const slowSpeed = 50; // actualización lenta de los últimos 10 números

    let counter = 0;
    const timer = setInterval(() => {
      // Incrementa el contador gradualmente
      counter++;
      // Si el contador llega a 200, detiene el temporizador
      if (counter === totalProjects) clearInterval(timer);
      // Actualiza el estado con el valor del contador
      setRegisteredProjects(counter);
    }, counter > totalProjects - 10 ? slowSpeed : fastSpeed);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearInterval(timer);
  }, []);

  return (
    <section id='about' className="about-container">
      <div className="content_about">
        <h1>BANCO DE PROYECTOS <span>HIDALGO</span></h1>
        <div className="about_txt">
          <p>Es el Sistema Gubernamental que permite a los gobiernos municipales, dependencias, organismos y a la ciudadanía organizar de forma sistemática los proyectos propuestos, que servirá de soporte para los procesos de planeación, presupuestación y ejecución de la inversión pública.
          </p>
          <p>Brindará asistencia y acompañamiento técnico en el proceso para la integración de los expedientes, el Banco de Proyectos permitirá fortalecer las políticas públicas que contribuyan al logro de los objetivos del Plan Estatal de Desarrollo, los Objetivos de Desarrollo Sostenible  y las metas por regiones y municipios, para asegurar la asignación eficiente de recursos y la mejora continua de la gestión pública en las diferentes regiones del Estado de Hidalgo. </p>
        </div>
      </div>
      <div className="background-about">
        <img src={`${imgBasePath}backAbout.jpg`} alt="img_representativa" className="floating-img" />
        <div className="about_num">

          <div className="about_numIndi">
            <p>{registeredProjects}<span>ANTEPROYECTOS REGISTRADOS</span></p>
          </div>

          <div className="about_numIndi">
            <p>20<span>PROYECTOS EN PROCESO DE DICTAMEN TÉCNICO</span></p>
          </div>

          <div className="about_numIndi">
            <p>20<span>PROYECTOS CON DICTAMEN TÉCNICO</span></p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
