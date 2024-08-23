import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import '../../components/styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/indicadores/";

const ProjectIndicators = () => {
  const [counts, setCounts] = useState({
    citizens: 0,
    municipalities: 0,
    organizations: 0,
    federal: 0,
  });
  const [hasCounted, setHasCounted] = useState(false);
  const indicatorsRef = useRef(null);

  const observer = useMemo(() => new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasCounted) {
        setHasCounted(true);
      }
    },
    { threshold: 1 }
  ), [hasCounted]);

  useEffect(() => {
    const currentRef = indicatorsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observer]);

  useEffect(() => {
    if (hasCounted) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/proyecto/');
          const projects = response.data;
          const totalValues = {
            citizens: projects.filter(project => project.tipo_entidad === 'Petición Personal').length,
            municipalities: projects.filter(project => project.tipo_entidad === 'Municipio').length,
            organizations: projects.filter(project =>
              project.tipo_entidad === 'Organismo' || project.tipo_entidad === 'Dependencia').length,
            federal: projects.filter(project => project.tipo_entidad === 'Federal').length,
          };

          const fastSpeed = 10;
          const mediumSpeed = 50;
          const slowSpeed = 200;

          Object.keys(totalValues).forEach((key) => {
            let counter = 0;
            if (totalValues[key] === 0) {
              setCounts((prevCounts) => ({
                ...prevCounts,
                [key]: 0,
              }));
            } else {
              const timer = setInterval(() => {
                counter++;
                setCounts((prevCounts) => ({
                  ...prevCounts,
                  [key]: counter,
                }));
                if (counter === totalValues[key]) clearInterval(timer);
              }, counter > totalValues[key] - 10 ? slowSpeed : (counter > totalValues[key] - 20 ? mediumSpeed : fastSpeed));
            }
          });
        } catch (error) {
          console.error('Error fetching project data:', error);
        }
      };

      fetchData();
    }
  }, [hasCounted]);

  return (
    <section id='projects' className="ProjectIndicators-container" ref={indicatorsRef}>
      <div className="indicators">
        <Indicator count={counts.federal} imgSrc={`${imgBasePath}Federal.webp`} label="Federal" />
        <Indicator count={counts.organizations} imgSrc={`${imgBasePath}Organismo.webp`}>
          <div>Dependencias</div>
          <div>y Organismos</div>
        </Indicator>
        <Indicator count={counts.municipalities} imgSrc={`${imgBasePath}Municipio.webp`} label="Municipios" />
        {/* <Indicator count={counts.citizens} imgSrc={`${imgBasePath}Ciudadania.webp`} label="Ciudadanía" /> */}
      </div>
    </section>
  );
};

const Indicator = ({ count, imgSrc, label, children }) => (
  <div className="indicators_ind">
    <div className="indicators_cont">
      <img src={imgSrc} alt={`img_${label}`} />
      <p>{count}</p>
    </div>
    <p className="indicators_txt">
      {children || label}
    </p>
  </div>
);

export default ProjectIndicators;
