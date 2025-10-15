import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserOptionsModal from './UserOptionsModal';
import styles from './NavbarLogin.module.css';

const img = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img/";
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const NavbarLogin = () => {
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // evita re-render por dependencia del scroll
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // fetch username 1 vez
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/current_user/');
        if (data?.username) setUsername(data.username);
      } catch (err) {
        console.error('Error fetching username:', err);
      }
    })();
  }, []);

  const onScroll = useCallback(() => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    setScrolled(y > 100);

    // mostrar cuando sube, ocultar cuando baja (con margen de 10px)
    const shouldShow = y < lastScrollY.current || y < 10;
    setVisible(shouldShow);
    lastScrollY.current = y;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(onScroll);
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  const toggleModal = (e) => {
    setAnchorElement(e.currentTarget);
    setIsModalOpen((v) => !v);
  };

  return (
    <nav
      className={[
        styles.nav,
        visible ? styles.active : styles.hidden,
        scrolled ? styles.scrolled : ''
      ].join(' ')}
    >
      <ul className={styles.list}>
        <div className={styles.brand}>
          <img src={`${img}Logotipo.webp`} alt="Logotipo Gobierno" className={styles.brandImg} />
          <li className={styles.item}>
            <Link to="/" className={styles.link}>Banco de Proyectos</Link>
          </li>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.circle}
            data-username={username || ''}
            onClick={toggleModal}
            aria-haspopup="menu"
            aria-expanded={isModalOpen ? 'true' : 'false'}
            aria-label={username ? `Opciones de ${username}` : 'Opciones de usuario'}
          >
            <img src={`${imgBasePath}estrella.webp`} alt="" className={styles.avatar} />
          </button>
        </div>
      </ul>

      <UserOptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        anchorElement={anchorElement}
        username={username}
      />
    </nav>
  );
};

export default NavbarLogin;
