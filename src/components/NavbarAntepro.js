import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import UserOptionsModal from './UserOptionsModal'; // Asegúrate de importar el modal

const img = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img/";
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const NavbarAntepro = () => {
  const [username, setUsername] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('/api/current_user/');
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < scrollPosition || currentScrollPos < 10);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  const toggleModal = (event) => {
    setAnchorElement(event.currentTarget);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className={`NavbarTablas ${visible ? 'active' : 'hidden'} ${scrollPosition > 100 ? 'scrolled' : ''}`}>
      <ul>
        <div className="NavbarLogin_img">
          <img src={`${img}Logotipo.webp`} alt="img_representativa" />
          <li><Link to="/" >Banco de Proyectos</Link></li>
        </div>
        <div className="NavbarTablas_inicio">
          <div className="Navbar_circulo" data-username={username} onClick={toggleModal}>
            <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
          </div>
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
}

export default NavbarAntepro;
