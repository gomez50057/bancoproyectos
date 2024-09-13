import React, { useEffect, useState } from 'react';
import './DashboardClient.css';
import SvgIcon from '../../../components/SvgIcon';
import ClientInveProjects from '../investmentBudget/ClientInveProjects';
import ClientInveProjectsAdmin from '../../Responsible/investmentBudget/ClientInveProjects';
import NavbarAntepro from '../../../components/NavbarAntepro';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const DashboardResponsible = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem('activeComponent') || 'ProjInvestment'
  );

  useEffect(() => {
    localStorage.setItem('activeComponent', activeComponent);

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
  }, [activeComponent]);

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
      case 'ProjInvestment':
        return <ClientInveProjects />;
      case 'ClientInveProjectsAdmin':
        return <ClientInveProjectsAdmin />;
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
            className={`list-item ${activeComponent === 'ClientInveProjectsAdmin' ? 'active' : ''}`}
            data-component="ClientInveProjectsAdmin"
            onClick={() => handleMenuClick('ClientInveProjectsAdmin')}
          >
            <b></b>
            <b></b>
            <button className="list-item-link">
              <div className="icon">
                <SvgIcon name="acuerdo" />
              </div>
              <span className="title">Proyectos de inversión Admin</span>
            </button>
          </li>
        </ul>

        <div className="sidebar-card">
          <div className="sidebarCardImg">
            <img src="/img/sidebarRecurso.png" alt="Icono de Cerrar Sesión" />
          </div>
          <button onClick={handleLogoutClick}>
            <img src={`${imgBasePath}exit.png`} alt="Icono de Cerrar Sesión" className="icon" />
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

export default DashboardResponsible;
