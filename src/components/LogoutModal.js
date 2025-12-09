import React from 'react';
import axios from 'axios';
import styles from './LogoutModal.module.css';

const LogoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout/');
      window.location.href = '/login'; // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión. Intenta de nuevo.');
    }
  };

  return (
    <div
      className={styles.confirmationModalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.confirmationModalContent}
        onClick={e => e.stopPropagation()}
      >
        <h2>Estás a punto de cerrar sesión</h2>
        <p>¿Estás seguro de que deseas salir?</p>
        <div className={styles.confirmationModalButtons}>
          <button
            className={styles.confirmButton}
            onClick={handleLogout}
          >
            Sí, Cerrar Sesión
          </button>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
