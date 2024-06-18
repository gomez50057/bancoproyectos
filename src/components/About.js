import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const About = () => {
  const [registeredProjects, setRegisteredProjects] = useState(0);
  const [projectsInProcess, setProjectsInProcess] = useState(0);
  const [approvedProjects, setApprovedProjects] = useState(0);
  const [startCounter, setStartCounter] = useState(false);
  const [hasCounted, setHasCounted] = useState(false);

  const controls = useAnimation();
  const { ref: aboutRef, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
      });
    } else {
      controls.start({
        x: -100,
        opacity: 0,
        transition: { type: 'spring', stiffness: 100 }
      });
    }
  }, [inView, controls]);

  useEffect(() => {
    if (inView && !hasCounted) {
      setStartCounter(true);
    }
  }, [inView, hasCounted]);

  useEffect(() => {
    if (startCounter && !hasCounted) {
      const totalRegisteredProjects = 200;
      const totalProjectsInProcess = 531;
      const totalApprovedProjects = 125;
      const fastSpeed = 5;
      const slowSpeed = 50;

      const animateCounter = (setCounter, total, delay) => {
        let counter = 0;
        const timer = setInterval(() => {
          counter++;
          setCounter(counter);
          if (counter === total) {
            clearInterval(timer);
            if (total === totalApprovedProjects) {
              setHasCounted(true); // Update the flag once all counters are done
            }
          }
        }, counter > total - 10 ? slowSpeed : fastSpeed);
      };

      animateCounter(setRegisteredProjects, totalRegisteredProjects);
      animateCounter(setProjectsInProcess, totalProjectsInProcess);
      animateCounter(setApprovedProjects, totalApprovedProjects);
    }
  }, [startCounter, hasCounted]);

  return (
    <section id='about' className="about-container">
      <div className="content_about" ref={aboutRef}>
        <h1>BANCO DE PROYECTOS <span>HIDALGO</span></h1>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={controls}
          className="about_txt"
        >
          <p>
            Es el Sistema Gubernamental que permite a los gobiernos municipales, dependencias, organismos y a la ciudadanía organizar de forma sistemática los proyectos propuestos, que servirá de soporte para los procesos de planeación, presupuestación y ejecución de la inversión pública.
          </p>
          <p>
            Brindará asistencia y acompañamiento técnico en el proceso para la integración de los expedientes, el Banco de Proyectos permitirá fortalecer las políticas públicas que contribuyan al logro de los objetivos del Plan Estatal de Desarrollo, los Objetivos de Desarrollo Sostenible y las metas por regiones y municipios, para asegurar la asignación eficiente de recursos y la mejora continua de la gestión pública en las diferentes regiones del Estado de Hidalgo.
          </p>
        </motion.div>
      </div>
      <div className="background-about">
        <div className="about_img">
          <img src={`${imgBasePath}backAbout.webp`} alt="img_representativa" />
        </div>
        <div className="about_num">
          <div className="about_numIndi">
            <p>{registeredProjects}<span>ANTEPROYECTOS REGISTRADOS</span></p>
          </div>
          <div className="about_numIndi">
            <p>{projectsInProcess}<span>PROYECTOS EN PROCESO DE DICTAMEN TÉCNICO</span></p>
          </div>
          <div className="about_numIndi">
            <p>{approvedProjects}<span>PROYECTOS CON DICTAMEN TÉCNICO</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
