// src/components/ProjectIndicators/ProjectIndicators.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './ProjectIndicators.module.css';

const imgTotalPath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/estrella.webp";

const ProjectIndicators = () => {
  const [total, setTotal] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
          observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasCounted]);

  useEffect(() => {
    if (!hasCounted) return;
    let cancelled = false;

    const fetchAndAnimate = async () => {
      try {
        const { data: projects } = await axios.get('/proyecto/');
        const finalCount = Array.isArray(projects) ? projects.length : 0;
        let counter = 0;
        const fastInterval = 5;    // intervalo rápido en ms
        const slowInterval = 200;   // intervalo lento en ms
        const thresholdCount = Math.max(finalCount - 10, 0);

        const animate = () => {
          if (cancelled) return;
          counter += 1;
          setTotal(counter);
          if (counter < finalCount) {
            const nextDelay = counter <= thresholdCount ? fastInterval : slowInterval;
            setTimeout(animate, nextDelay);
          }
        };

        animate();
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchAndAnimate();
    return () => { cancelled = true; };
  }, [hasCounted]);

  return (
    <section id="projects" className={styles.container} ref={sectionRef}>
      <div className={styles.cardWrapper}>
        <Indicator
          count={total}
          imgSrc={imgTotalPath}
          label="Proyectos Totales"
        />
      </div>
    </section>
  );
};

const Indicator = ({ count, imgSrc, label }) => (
  <div className={styles.card}>
    <img src={imgSrc} alt={label} className={styles.icon} />
    <div className={styles.text}>
      <p className={styles.count}>{count}</p>
      <p className={styles.label}>{label}</p>
      <p className={styles.notice}>
        El total corresponde a los proyectos registrados por los municipios y dependencias del estado, los cuales serán revisados por el área correspondiente.
      </p>
    </div>
  </div>
);

export default ProjectIndicators;
