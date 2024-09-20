import React, { useEffect, useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import './DashboardInvestment.css'; // Asegúrate de incluir tu archivo CSS
import 'chart.js/auto';

const DashboardInvestment = () => {
  const [totalProyectos, setTotalProyectos] = useState(0);
  const [proyectosPorUnidad, setProyectosPorUnidad] = useState([]);
  const [proyectosPorUsuario, setProyectosPorUsuario] = useState([]);
  const [propuestaCampana, setPropuestaCampana] = useState({});
  const [cualPropuesta, setCualPropuesta] = useState([]);
  const [coberturaProyecto, setCoberturaProyecto] = useState([]);

  useEffect(() => {
    // Total de proyectos
    axios.get('/api/proyectos_totales/')
      .then(response => setTotalProyectos(response.data.total_proyectos));

    // Proyectos por unidad responsable
    axios.get('/api/proyectos_por_unidad_responsable/')
      .then(response => setProyectosPorUnidad(response.data));

    // Proyectos por usuario
    axios.get('/api/proyectos_por_usuario/')
      .then(response => setProyectosPorUsuario(response.data));

    // Propuesta campaña
    axios.get('/api/propuesta_campana/')
      .then(response => setPropuestaCampana(response.data));

    // Cual propuesta
    axios.get('/api/cual_propuesta/')
      .then(response => setCualPropuesta(response.data));

    // Cobertura de proyectos
    axios.get('/api/cobertura_proyecto/')
      .then(response => setCoberturaProyecto(response.data));
  }, []);

  // Configuración de las gráficas
  const chartData = {
    proyectosPorUnidad: {
      labels: proyectosPorUnidad.map(item => item.unidad_responsable),
      datasets: [{
        label: 'Proyectos por Unidad Responsable',
        data: proyectosPorUnidad.map(item => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    proyectosPorUsuario: {
      labels: proyectosPorUsuario.map(item => item.user__username),
      datasets: [{
        label: 'Proyectos por Usuario',
        data: proyectosPorUsuario.map(item => item.total),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }]
    },
    propuestaCampana: {
      labels: ['Si', 'No'],
      datasets: [{
        data: [propuestaCampana.Si, propuestaCampana.No],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
      }]
    },
    cualPropuesta: {
      labels: cualPropuesta.map(item => item.cual_propuesta),
      datasets: [{
        label: 'Frecuencia de Cual Propuesta',
        data: cualPropuesta.map(item => item.total),
        backgroundColor: 'rgba(255, 206, 86, 0.6)'
      }]
    },
    coberturaProyecto: {
      labels: coberturaProyecto.map(item => item.cobertura),
      datasets: [{
        label: 'Cobertura del Proyecto',
        data: coberturaProyecto.map(item => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de Inversiones</h2>
      <p className="total-proyectos">Total de proyectos: {totalProyectos}</p>

      <div className="chart-section">
        <h3>Proyectos por Unidad Responsable</h3>
        <Bar data={chartData.proyectosPorUnidad} />
      </div>

      <div className="chart-section">
        <h3>Proyectos por Usuario</h3>
        <Bar data={chartData.proyectosPorUsuario} />
      </div>

      <div className="chart-section">
        <h3>Propuesta Campaña (Sí / No)</h3>
        <Pie data={chartData.propuestaCampana} />
      </div>

      <div className="chart-section">
        <h3>Cual Propuesta</h3>
        <Doughnut data={chartData.cualPropuesta} />
      </div>

      <div className="chart-section">
        <h3>Cobertura del Proyecto</h3>
        <Bar data={chartData.coberturaProyecto} />
      </div>
    </div>
  );
};

export default DashboardInvestment;
