import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import SvgIcon from './SvgIcon';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach((item) => {
      item.addEventListener('click', () => {
        listItems.forEach((li) => li.classList.remove('active'));
        item.classList.add('active');
      });
    });

    const toggleBtn = document.querySelector('.toggle');
    const sidebar = document.querySelector('.sidebar');

    sidebar.classList.add('active');
    toggleBtn.classList.add('active');

    toggleBtn.onclick = () => {
      toggleBtn.classList.toggle('active');
      sidebar.classList.toggle('active');
    };
  }, []);

  const handleMenuClick = (componentName) => {
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach((li) => li.classList.remove('active'));
    document.querySelector(`[data-component=${componentName}]`).classList.add('active');
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    window.location.href = '/';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar active">
        <div className="toggle active"></div>
        <ul className="list">
          <li
            className="list-item"
            data-component="dashboard"
            onClick={() => handleMenuClick('dashboard')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link" onClick={() => handleMenuClick('dashboard')}>
              <div className="icon">
                <SvgIcon name="dashboard" />
              </div>
              <span className="title">Dashboard</span>
            </button>
          </li>
          <li
            className="list-item active"
            data-component="formulario"
            onClick={() => handleMenuClick('formulario')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link" onClick={() => handleMenuClick('formulario')}>
              <div className="icon">
                <SvgIcon name="formulario" />
              </div>
              <span className="title">Formulario</span>
            </button>
          </li>
          <li
            className="list-item"
            data-component="acuerdosCoordinador"
            onClick={() => handleMenuClick('acuerdosCoordinador')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link" onClick={() => handleMenuClick('acuerdosCoordinador')}>
              <div className="icon">
                <SvgIcon name="acuerdo" />
              </div>
              <span className="title">Acuerdos</span>
              <span className="sub-title">coordinador</span>
            </button>
          </li>
          <li
            className="list-item"
            data-component="acuerdosResponsable"
            onClick={() => handleMenuClick('acuerdosResponsable')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link" onClick={() => handleMenuClick('acuerdosResponsable')}>
              <div className="icon">
                <SvgIcon name="acuerdo" />
              </div>
              <span className="title">Acuerdos</span>
              <span className="sub-title">responsable</span>
            </button>
          </li>
          <li
            className="list-item"
            data-component="acuerdosEnlace"
            onClick={() => handleMenuClick('acuerdosEnlace')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link" onClick={() => handleMenuClick('acuerdosEnlace')}>
              <div className="icon">
                <SvgIcon name="acuerdo" />
              </div>
              <span className="title">Acuerdos</span>
              <span className="sub-title">enlace</span>
            </button>
          </li>
        </ul>

        <div className="sidebar-card">
          <div className="sidebarCardImg">
            <img src="/img/sidebarRecurso.png" alt="Icono de Cerrar Sesión" />
          </div>
          <button onClick={handleLogoutClick}>
            <img src="/img/iconos/exit.png" alt="Icono de Cerrar Sesión" className="icon" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        <section className="content">
          {/* contenido del dashboard según sea necesario */}
        </section>
      </div>

      {/* Este es un modal de confirmación que puedes implementar */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Cierre de Sesión</h2>
            <button onClick={handleConfirmLogout}>Confirmar</button>
            <button onClick={handleCloseModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
