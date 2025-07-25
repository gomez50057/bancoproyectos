// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 1) Al montar, limpio cualquier hash de la URL:
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  // 2) Manejo de ocultar/mostrar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = window.pageYOffset;
      setVisible(current < scrollPosition || current < 10);
      setScrollPosition(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  const toggleMenu = () => setMenuOpen(open => !open);

  // 3) click en “Mapa Interactivo”: navega a "/" (si hace falta) y luego scroll a #map, SIN dejar el hash en la URL
  const handleMapClick = async (e) => {
    e.preventDefault();
    setMenuOpen(false);

    const scrollToMap = () => {
      const mapEl = document.getElementById('map');
      if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
      // tras el scroll, volvemos a limpiar por si el navegador añade el hash
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    };

    if (location.pathname !== '/') {
      await navigate('/');
      // un pelín de tiempo para que React pinte la sección
      setTimeout(scrollToMap, 100);
    } else {
      scrollToMap();
    }
  };

  const navClass = [
    styles.navbar,
    visible ? styles.active : styles.hidden,
    scrollPosition > 100 ? styles.scrolled : ''
  ].join(' ');

  return (
    <nav className={navClass}>
      <div className={styles.navInner}>
        <div className={styles.logo}>
          <img
            src="https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/Logotipo.webp"
            alt="Logo"
          />
        </div>

        <button className={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`${styles.navOptions} ${menuOpen ? styles.open : ''}`}>
          <li className={styles.navItem}>
            <a
              href="/"
              onClick={handleMapClick}
              className={styles.navLink}
            >
              Inicio
            </a>
          </li>
          <li className={styles.navItem}>
            <Link to="/login" className={styles.buttonAcceder}>
              Acceder
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
