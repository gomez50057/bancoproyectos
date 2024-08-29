import React from 'react';
import './UserOptionsModal.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const UserOptionsModal = ({ isOpen, onClose, anchorElement, username }) => {
  if (!isOpen || !anchorElement) return null;

  const { top, left, height } = anchorElement.getBoundingClientRect();
  const modalStyle = {
    position: 'absolute',
    top: top + height + window.scrollY + 30,
    left: left + window.scrollX - 200,
    zIndex: 1000,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
          <div className="profile-info">
            <div className="username">{username}</div>
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

        <button className="logout-button" onClick={() => alert('Cerrar sesión')}>
          <LogoutIcon />
          Finalizar la sesión
        </button>
      </div>
    </div>
  );
};

export default UserOptionsModal;
