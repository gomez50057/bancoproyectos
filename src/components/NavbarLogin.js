import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
const img = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img/";
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const NavbarLogin = () => {
  const [username, setUsername] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

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

  return (
    <nav className={`NavbarLogin ${visible ? 'active' : 'hidden'} ${scrollPosition > 100 ? 'scrolled' : ''}`}>
      <ul>
        <div className="NavbarLogin_img">
          <img src={`${img}Logotipo.webp`} alt="img_representativa" />
          <li><Link to="/" className=""> Banco de Proyectos </Link></li>
        </div>
        <div className="NavbarLogin_inicio">
          <div className="Navbar_circulo" data-username={username}>
            <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default NavbarLogin;
