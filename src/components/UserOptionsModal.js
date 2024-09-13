import React from 'react';
import './UserOptionsModal.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const UserOptionsModal = ({ isOpen, onClose, anchorElement, username }) => {
  if (!isOpen || !anchorElement) return null;

  const { top, left, height } = anchorElement.getBoundingClientRect();
  const modalStyle = {
    position: 'absolute',
    top: top + height + (window.scrollY > 0 ? 100 : 30),
    left: left + window.scrollX - 200,
    zIndex: 1000,
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout/');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión. Intenta de nuevo.');
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
          <div className="profile-info">
            {username ? (
              <div className="username">{username}</div>
            ) : (
              <div className="username" onClick={handleLoginRedirect} style={{ cursor: 'pointer', color: 'blue' }}>
                Inicia sesión primero
              </div>
            )}
          </div>
        </div>

        <div className="menu-item" onClick={() => alert('Ayuda Técnica')}>
          <HelpOutlineIcon />
          <span>Ayuda Técnica</span>
        </div>

        <div className="menu-item" onClick={() => alert('Preguntas frecuentes')}>
          <HelpOutlineIcon />
          <span>Preguntas frecuentes</span>
        </div>

        <button 
          className="logout-button" 
          onClick={username ? handleLogout : handleLoginRedirect}
        >
          <LogoutIcon />
          {username ? 'Finalizar la sesión' : 'Iniciar sesión'}
        </button>
      </div>
    </div>
  );
};

export default UserOptionsModal;
