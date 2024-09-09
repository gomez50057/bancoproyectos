import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import SvgIcon from './SvgIcon';
import ClientProjects from '../Client/ClientProjects';
import ClientInveProjects from '../Client/PresupuestoInver/ClientInveProjects';
import NavbarAntepro from '../../components/NavbarAntepro';
// import EditProjectInvestAdmin from '../../components/EditProjectInvestAdmin';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('formulario'); // Estado para controlar el componente activo

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
    setActiveComponent(componentName); // Actualiza el componente activo según el menú seleccionado
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

  // Renderiza el componente activo basado en el estado
  const renderContent = () => {
    switch (activeComponent) {
      case 'formulario':
        return <ClientProjects />;
      case 'ProjInvestment':
        return <ClientInveProjects />;
      // case 'ProjInvestmentAdmin':
      //   return <EditProjectInvestAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar active">
        <div className="toggle active"></div>
        <ul className="list">
          <li
            className="list-item active"
            data-component="formulario"
            onClick={() => handleMenuClick('formulario')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link">
              <div className="icon">
                <SvgIcon name="formulario" />
              </div>
              <span className="title">Proyectos Registrados</span>
            </button>
          </li>
          <li
            className="list-item"
            data-component="ProjInvestment"
            onClick={() => handleMenuClick('ProjInvestment')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link">
              <div className="icon">
                <SvgIcon name="acuerdo" />
              </div>
              <span className="title">Proyectos de inversión</span>
            </button>
          </li>
          {/* <li
            className="list-item"
            data-component="ProjInvestmentAdmin"
            onClick={() => handleMenuClick('ProjInvestmentAdmin')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link">
              <div className="icon">
                <SvgIcon name="acuerdo" />
              </div>
              <span className="title">Proyectos de inversión Admin</span>
            </button>
          </li>*/}
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
          <NavbarAntepro />
          {renderContent()}
        </section>
      </div>

      {/* Modal de confirmación */}
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
