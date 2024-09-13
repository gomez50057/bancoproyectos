import React from 'react';
import './LogoutModal.css';
import axios from 'axios';

const LogoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout/');
      window.location.href = '/login';  // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión. Intenta de nuevo.');
    }
  };

  return (
    <div className="confirmation-modal-overlay" onClick={onClose}>
      <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Estás a punto de cerrar sesión</h2>
        <p>¿Estás seguro de que deseas salir?</p>
        <div className="confirmation-modal-buttons">
          <button className="confirm-button" onClick={handleLogout}>Sí, Cerrar Sesión</button>
          <button className="cancel-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
