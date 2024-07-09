import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../../components/styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/indicadores/";

const ProjectIndicators = () => {
  const [counts, setCounts] = useState({
    citizens: 0,
    departments: 0,
    municipalities: 0,
    organizations: 0,
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
      const totalValues = {
        citizens: 90,
        departments: 100,
        municipalities: 110,
        organizations: 120,
      };
      const fastSpeed = 10;
      const mediumSpeed = 50;
      const slowSpeed = 200;

      Object.keys(totalValues).forEach((key) => {
        let counter = 0;
        const timer = setInterval(() => {
          counter++;
          setCounts((prevCounts) => ({
            ...prevCounts,
            [key]: counter,
          }));
          if (counter === totalValues[key]) clearInterval(timer);
        }, counter > totalValues[key] - 10 ? slowSpeed : (counter > totalValues[key] - 20 ? mediumSpeed : fastSpeed));
      });
    }
  }, [hasCounted]);

  return (
    <section id='projects' className="ProjectIndicators-container" ref={indicatorsRef}>
      <div className="indicators">
        <Indicator count={counts.citizens} imgSrc={`${imgBasePath}Ciudadania.webp`} label="Ciudadanía" />
        <Indicator count={counts.departments} imgSrc={`${imgBasePath}Dependencia.webp`} label="Dependencia" />
        <Indicator count={counts.municipalities} imgSrc={`${imgBasePath}Municipio.webp`} label="Municipio" />
        <Indicator count={counts.organizations} imgSrc={`${imgBasePath}Organismo.webp`} label="Organismo" />
      </div>
    </section>
  );
};

const Indicator = ({ count, imgSrc, label }) => (
  <div className="indicators_ind">
    <div className="indicators_cont">
      <img src={imgSrc} alt={`img_${label}`} />
      <p>{count}</p>
    </div>
    <p className="indicators_txt">{label}</p>
  </div>
);

export default ProjectIndicators;
