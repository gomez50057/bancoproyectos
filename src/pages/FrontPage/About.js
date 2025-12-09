// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../components/styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const About = () => {


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
            El Banco de Proyectos permitirá fortalecer las políticas públicas que contribuyan al logro de los objetivos del Plan Estatal de Desarrollo, los Objetivos de Desarrollo Sostenible y las metas por regiones y municipios, para asegurar la asignación eficiente de recursos y la mejora continua de la gestión pública en las diferentes regiones del Estado de Hidalgo.
          </p>
        </motion.div>
      </div>
      <div className="background-about">
        <div className="about_img">
          <img src={`${imgBasePath}backAbout.webp`} alt="img_representativa" />
        </div>
      </div>
    </section>
  );
}

export default About;
