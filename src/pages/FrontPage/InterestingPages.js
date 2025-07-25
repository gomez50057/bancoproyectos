// InterestingPages.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../components/styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const InterestingPages = () => {
  const { ref: textRef, inView: textInView } = useInView({ threshold: 0.3 });
  const { ref: btn1Ref, inView: btn1InView } = useInView({ threshold: 0.3 });
  const { ref: btn2Ref, inView: btn2InView } = useInView({ threshold: 0.3 });

  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="interesting-pages">
      <video
        className="background-video"
        src={`${imgBasePath}video/proyecto.mp4`}
        autoPlay
        muted
        loop
        playsInline
      >
        Tu navegador no soporta el elemento <code>video</code>.
      </video>

      <div className="content">
        <motion.h2
          ref={textRef}
          className="interests_txt"
          initial={{ y: 50, opacity: 0 }}
          animate={textInView ? { y: 0, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          ¡Conoce parte de los <span>proyectos!</span>
        </motion.h2>

        <div className="buttons-container">
          <motion.div
            ref={btn1Ref}
            initial={{ y: 50, opacity: 0 }}
            animate={btn1InView ? { y: 0, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
          >
            <Link to="/table" className="rectangle-button">
              Tablero de Proyectos
            </Link>
          </motion.div>

          <motion.div
            ref={btn2Ref}
            initial={{ y: 50, opacity: 0 }}
            animate={btn2InView ? { y: 0, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 100, delay: 0.6 }}
          >
            <a
              href="#map"
              onClick={(e) => handleScroll(e, 'map')}
              className="rectangle-button"
            >
              Mapa Interactivo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InterestingPages;
