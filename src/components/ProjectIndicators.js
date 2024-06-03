import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/indicadores/";

const ProjectIndicators = () => {
  const [citizensCount, setCitizensCount] = useState(0);
  const [departmentsCount, setDepartmentsCount] = useState(0);
  const [municipalitiesCount, setMunicipalitiesCount] = useState(0);
  const [organizationsCount, setOrganizationsCount] = useState(0);
  const [hasCounted, setHasCounted] = useState(false); // Estado para asegurarnos de contar solo una vez
  const indicatorsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasCounted) {
        setHasCounted(true);
      }
    }, { threshold: 1 }); // Cambiado el threshold a 0.25 para 1/4 del elemento

    if (indicatorsRef.current) {
      observer.observe(indicatorsRef.current);
    }

    return () => {
      if (indicatorsRef.current) {
        observer.unobserve(indicatorsRef.current);
      }
    };
  }, [hasCounted]);

  useEffect(() => {
    if (hasCounted) {
      const totalCitizens = 120;
      const totalDepartments = 120;
      const totalMunicipalities = 120;
      const totalOrganizations = 120;
      const fastSpeed = 5;
      const slowSpeed = 50;

      const animateCounter = (setCounter, total) => {
        let counter = 0;
        const timer = setInterval(() => {
          counter++;
          setCounter(counter);
          if (counter === total) clearInterval(timer);
        }, counter > total - 10 ? slowSpeed : fastSpeed);
      };

      animateCounter(setCitizensCount, totalCitizens);
      animateCounter(setDepartmentsCount, totalDepartments);
      animateCounter(setMunicipalitiesCount, totalMunicipalities);
      animateCounter(setOrganizationsCount, totalOrganizations);
    }
  }, [hasCounted]);

  return (
    <section id='projects' className="ProjectIndicators-container" ref={indicatorsRef}>
      <div className="indicators">
        <div className="indicators_ind">
          <div className="indicators_cont">
            <img src={`${imgBasePath}ciudadania.png`} alt="img_representativa" />
            <p>{citizensCount}</p>
          </div>
          <p className="indicators_txt">Ciudadanía</p>
        </div>

        <div className="indicators_ind">
          <div className="indicators_cont">
            <img src={`${imgBasePath}dependencias.png`} alt="img_representativa" />
            <p>{departmentsCount}</p>
          </div>
          <p className="indicators_txt">Dependencia</p>
        </div>

        <div className="indicators_ind">
          <div className="indicators_cont">
            <img src={`${imgBasePath}municipio.png`} alt="img_representativa" />
            <p>{municipalitiesCount}</p>
          </div>
          <p className="indicators_txt">Municipio</p>
        </div>

        <div className="indicators_ind">
          <div className="indicators_cont">
            <img src={`${imgBasePath}dependencias.png`} alt="img_representativa" />
            <p>{organizationsCount}</p>
          </div>
          <p className="indicators_txt">Organismo</p>
        </div>
      </div>
    </section>
  );
}

export default ProjectIndicators;
