import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const imgBasePath = "img/";

const About = () => {
  const [registeredProjects, setRegisteredProjects] = useState(0);
  const [startCounter, setStartCounter] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = aboutRef.current;
      if (aboutSection) {
        const top = aboutSection.offsetTop; // Posición superior de la sección
        const bottom = top + aboutSection.offsetHeight; // Posición inferior de la sección
        const scrollPosition = window.scrollY;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          setStartCounter(true);
        } else {
          setStartCounter(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (startCounter) {
      const totalProjects = 200;
      const fastSpeed = 5;
      const slowSpeed = 50;

      let counter = 0;
      const timer = setInterval(() => {
        counter++;
        if (counter === totalProjects) clearInterval(timer);
        setRegisteredProjects(counter);
      }, counter > totalProjects - 10 ? slowSpeed : fastSpeed);

      return () => clearInterval(timer);
    }
  }, [startCounter]);

  return (
    <section id='about' className="about-container" ref={aboutRef}>
      <div className="content_about">
        <h1>BANCO DE PROYECTOS <span>HIDALGO</span></h1>
        <div className="about_txt">
          <p>Es el Sistema Gubernamental que permite a los gobiernos municipales, dependencias, organismos y a la ciudadanía organizar de forma sistemática los proyectos propuestos, que servirá de soporte para los procesos de planeación, presupuestación y ejecución de la inversión pública.
          </p>
          <p>Brindará asistencia y acompañamiento técnico en el proceso para la integración de los expedientes, el Banco de Proyectos permitirá fortalecer las políticas públicas que contribuyan al logro de los objetivos del Plan Estatal de Desarrollo, los Objetivos de Desarrollo Sostenible  y las metas por regiones y municipios, para asegurar la asignación eficiente de recursos y la mejora continua de la gestión pública en las diferentes regiones del Estado de Hidalgo. </p>
        </div>
      </div>
      <div className="background-about">
        <div className="about_img">
          <img src={`${imgBasePath}backAbout.jpg`} alt="img_representativa" />
        </div>
        <div className="about_num">
          <div className="about_numIndi">
            <p>{registeredProjects}<span>ANTEPROYECTOS REGISTRADOS</span></p>
          </div>
          <div className="about_numIndi">
            <p>200<span>PROYECTOS EN PROCESO DE DICTAMEN TÉCNICO</span></p>
          </div>
          <div className="about_numIndi">
            <p>200<span>PROYECTOS CON DICTAMEN TÉCNICO</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
