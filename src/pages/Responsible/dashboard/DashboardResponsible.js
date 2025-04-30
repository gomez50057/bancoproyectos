import React, { useEffect, useState } from 'react';
import '../../../components/Dashboard.css';
import SvgIcon from '../../../components/SvgIcon';
import ClientInveProjectsAdmin from '../../Responsible/investmentBudget/ClientInveProjects';
import CRUDTable from '../../Responsible/projectRegistration/CRUDTable';
import NavbarAntepro from '../../../components/NavbarAntepro';
import LogoutConfirmationModal from '../../../components/LogoutModal';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const DashboardResponsible = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem('activeComponent') || 'ClientInveProjectsAdmin'
  );

  useEffect(() => {
    localStorage.setItem('activeComponent', activeComponent);

    const listItems = document.querySelectorAll('.list-item');

    const handleClick = (event) => {
      listItems.forEach((li) => li.classList.remove('active'));
      event.currentTarget.classList.add('active');
    };

    listItems.forEach((item) => item.addEventListener('click', handleClick));

    const toggleBtn = document.querySelector('.toggle');
    const sidebar = document.querySelector('.sidebar');

    sidebar.classList.add('active');
    toggleBtn.classList.add('active');

    toggleBtn.onclick = () => {
      toggleBtn.classList.toggle('active');
      sidebar.classList.toggle('active');
    };

    return () => {
      listItems.forEach((item) => item.removeEventListener('click', handleClick));
    };
  }, [activeComponent]);

  const handleMenuClick = (componentName) => {
    setActiveComponent(componentName);
    localStorage.setItem('activeComponent', componentName);

    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach((li) => li.classList.remove('active'));

    const activeItem = document.querySelector(`[data-component=${componentName}]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'ClientInveProjectsAdmin':
        return <ClientInveProjectsAdmin />;
      case 'CRUDTable':
        return <CRUDTable />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar active">
        <div className="toggle active"></div>
        <ul className="list">
          {/* <li
            className={`list-item ${activeComponent === 'ClientInveProjectsAdmin' ? 'active' : ''}`}
            data-component="ClientInveProjectsAdmin"
            onClick={() => handleMenuClick('ClientInveProjectsAdmin')}
          >
            <button className="list-item-link">
              <div className="icon">
                <SvgIcon name="acuerdo" />
              </div>
              <span className="title">Proyectos de Inversión Admin</span>
            </button>
          </li> */}
          <li
            className={`list-item ${activeComponent === 'CRUDTable' ? 'active' : ''}`}
            data-component="CRUDTable"
            onClick={() => handleMenuClick('CRUDTable')}
          >
            <button className="list-item-link">
              <div className="icon">
                <SvgIcon name="formulario" />
              </div>
              <span className="title">Registro de Proyectos Admin</span>
            </button>
          </li>
        </ul>

        <div className="sidebar-card">
          <div className="sidebarCardImg">
            <img src={`${imgBasePath}sidebarRecurso.webp`} alt="sidebar Recurso" />
          </div>
          <button onClick={handleLogoutClick}>
            <img src={`${imgBasePath}exit.png`} alt="Cerrar Sesión" className="icon" />
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

      {isLogoutModalOpen && (
        <LogoutConfirmationModal
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
        />
      )}
    </div>
  );
};

export default DashboardResponsible;
