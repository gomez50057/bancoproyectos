
import React, { useEffect, useRef } from 'react';
import '../../components/styles.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const Home = () => {
    const homeTxtRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const parallax = homeTxtRef.current;
            let scrollPosition = window.pageYOffset;

            parallax.style.transform = 'translateY(' + scrollPosition * 0.35 + 'px)';
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const targets = document.querySelectorAll('.fade-in-target');
        targets.forEach(target => {
            observer.observe(target);
        });

        // Cleanup observer on component unmount
        return () => {
            targets.forEach(target => {
                observer.unobserve(target);
            });
        };
    }, []);

    return (
        <section id='home' className="home-container">
            <div className="background-svg" />
            <div className="content_home">
                <div className="home_txt fade-in-target" ref={homeTxtRef}>
                    <img src={`${imgBasePath}hometxt.webp`} alt="img_representativa" />
                </div>
                <div className="home_img fade-in-target">
                    <img src={`${imgBasePath}homeimg.webp`} alt="img_representativa" className="floating-img" />
                </div>
            </div>
        </section>
    );
}

export default Home;
