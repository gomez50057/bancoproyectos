import React, { useState } from 'react'; // Las importaciones deben estar al principio
import './UserOptionsModal.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutConfirmationModal from '../components/LogoutModal';
import { useNavigate } from 'react-router-dom';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const UserOptionsModal = ({ isOpen, onClose, anchorElement, username }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!isOpen || !anchorElement) return null; // Retorna si no hay modal abierto o no existe el elemento ancla

  const { top, left, height } = anchorElement.getBoundingClientRect();
  const modalStyle = {
    position: 'absolute',
    top: top + height + (window.scrollY > 0 ? 100 : 30),
    left: left + window.scrollX - 200,
    zIndex: 1000,
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleFaqClick = () => {
    navigate('/preguntas-frecuentes');
  };

  return (
    <>
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

          <div className="menu-item" onClick={handleFaqClick}>
            <HelpOutlineIcon />
            <span>Preguntas frecuentes</span>
          </div>

          <div className="menu-item" onClick={() => alert('Ayuda Técnica')}>
            <HelpOutlineIcon />
            <span>Ayuda Técnica</span>
          </div>

          <button
            className="logout-button"
            onClick={username ? handleLogoutClick : handleLoginRedirect}
          >
            <LogoutIcon />
            {username ? 'Finalizar la sesión' : 'Iniciar sesión'}
          </button>
        </div>
      </div>

      {isLogoutModalOpen && (
        <LogoutConfirmationModal isOpen={isLogoutModalOpen} onClose={handleCloseLogoutModal} />
      )}
    </>
  );
};

export default UserOptionsModal;
