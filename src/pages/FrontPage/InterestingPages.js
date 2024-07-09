import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../components/styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const InterestingPages = () => {
    const controls = useAnimation();
    const { ref: h2Ref, inView: h2InView } = useInView({ threshold: 0.3 });
    const { ref: rect1Ref, inView: rect1InView } = useInView({ threshold: 0.3 });
    const { ref: rect2Ref, inView: rect2InView } = useInView({ threshold: 0.3 });

    React.useEffect(() => {
        if (h2InView) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: { type: 'spring', stiffness: 100, delay: 0.2 }
            });
        }
    }, [h2InView, controls]);

    React.useEffect(() => {
        if (rect1InView) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: { type: 'spring', stiffness: 100, delay: 0.4 }
            });
        }
    }, [rect1InView, controls]);

    React.useEffect(() => {
        if (rect2InView) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: { type: 'spring', stiffness: 100, delay: 0.6 }
            });
        }
    }, [rect2InView, controls]);

    return (
        <section id='interests' className="interesting-pages">
            <motion.h2 
                className="interests_txt"
                initial={{ y: 100, opacity: 0 }}
                animate={h2InView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                ref={h2Ref}
            >
                CONOCE Y CREA <span>PROPUESTAS</span>
            </motion.h2>
            <div className="interests_reg">
                <motion.div 
                    className="rectangle"
                    initial={{ y: 100, opacity: 0 }}
                    animate={rect1InView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
                    ref={rect1Ref}
                >
                    <p>Conoce los proyectos de tu localidad</p>
                    <Link to="/table" className="rectangle-button">
                        <img src={`${imgBasePath}botton.webp`} alt="Icono" className="icon" />
                        <p>Descubre más...</p>
                    </Link>
                    {/* <Link to="/crud" className="rectangle-button">
                        <img src={`${imgBasePath}botton.webp`} alt="Icono" className="icon" />
                        <p>2Descubre más...</p>
                    </Link> */}
                </motion.div>
                <motion.div 
                    className="rectangle"
                    initial={{ y: 100, opacity: 0 }}
                    animate={rect2InView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.6 }}
                    ref={rect2Ref}
                >
                    <p>Carga tu proyecto</p>
                    <Link to="/login" className="rectangle-button">
                        <img src={`${imgBasePath}botton.webp`} alt="Icono" className="icon" />
                        <p>Se parte del futuro</p>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default InterestingPages;

