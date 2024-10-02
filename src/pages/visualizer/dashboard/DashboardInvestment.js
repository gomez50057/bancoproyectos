import React, { useEffect, useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import './DashboardInvestment.css'; // Asegúrate de incluir tu archivo CSS
import 'chart.js/auto';

const DashboardInvestment = () => {
  const [proyectosPorUnidad, setProyectosPorUnidad] = useState([]);
  const [proyectosPorUsuario, setProyectosPorUsuario] = useState([]);
  const [propuestaCampana, setPropuestaCampana] = useState({});
  const [cualPropuesta, setCualPropuesta] = useState([]);
  const [coberturaProyecto, setCoberturaProyecto] = useState([]);

  useEffect(() => {
    // Proyectos por unidad responsable
    axios.get('/api/proyectos_por_unidad_responsable/')
      .then(response => setProyectosPorUnidad(response.data));

    // Proyectos por usuario
    axios.get('/api/proyectos_por_usuario/')
      .then(response => setProyectosPorUsuario(response.data));

    // Propuesta campaña (Sí/No)
    axios.get('/api/propuesta_campana/')
      .then(response => setPropuestaCampana(response.data));

    // Cual propuesta
    axios.get('/api/cual_propuesta/')
      .then(response => setCualPropuesta(response.data));

    // Cobertura del proyecto
    axios.get('/api/cobertura_proyecto/')
      .then(response => setCoberturaProyecto(response.data));
  }, []);

  // Calcular el total de proyectos sumando los proyectos por unidad responsable
  const totalProyectosUnidad = proyectosPorUnidad.reduce((sum, item) => sum + item.total, 0);
  // const totalProyectosUsuario = proyectosPorUsuario.reduce((sum, item) => sum + item.total, 0);

  // Datos para el gráfico "Proyectos por Unidad Responsable"
  const chartDataUnidad = {
    labels: proyectosPorUnidad.map(item => item.unidad_responsable),
    datasets: [{
      label: 'Proyectos por Unidad Responsable',
      data: proyectosPorUnidad.map(item => item.total),
      backgroundColor: ['#8A2BE2', '#00C49F', '#00a65a', '#888888', '#FF4500', '#FF8C00'],
      borderWidth: 1,
      borderRadius: 8, // Bordes redondeados de las barras
    }]
  };

  // Datos para el gráfico "Proyectos por Usuario"
  const chartDataUsuario = {
    labels: proyectosPorUsuario.map(item => item.user__username),
    datasets: [{
      label: 'Proyectos por Usuario',
      data: proyectosPorUsuario.map(item => item.total),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      borderWidth: 1,
      borderRadius: 8,
    }]
  };

  // Datos para el gráfico "Propuesta Campaña (Sí / No)"
  const chartDataPropuesta = {
    labels: ['Sí', 'No'],
    datasets: [{
      data: [propuestaCampana.Si || 0, propuestaCampana.No || 0], // Manejar nulos
      backgroundColor: ['#36A2EB', '#FF6384'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  // Datos para el gráfico "Cual Propuesta"
  const chartDataCualPropuesta = {
    labels: cualPropuesta.map(item => item.cual_propuesta),
    datasets: [{
      label: 'Frecuencia de Cual Propuesta',
      data: cualPropuesta.map(item => item.total),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }]
  };

  // Datos para el gráfico "Cobertura del Proyecto"
  const chartDataCobertura = {
    labels: coberturaProyecto.map(item => item.cobertura),
    datasets: [{
      label: 'Cobertura del Proyecto',
      data: coberturaProyecto.map(item => item.total),
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      borderWidth: 1,
      borderRadius: 8,
    }]
  };

  // Opciones comunes para gráficos de barras
  const chartOptionsBar = {
    indexAxis: 'y', // Hacer que las barras sean horizontales
    scales: {
      x: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false // Ocultar la leyenda predeterminada
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.raw;
            const percentage = ((total / totalProyectosUnidad) * 100).toFixed(2);
            return `${total} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de Inversiones</h2>
      {/* Mostrar el total de proyectos */}
      <p className="total-proyectos">Total de proyectos por unidad responsable: {totalProyectosUnidad}</p>

      {/* Proyectos por Unidad Responsable */}
      <div className="chart-section">
        <h3>Proyectos por Unidad Responsable</h3>
        <Bar data={chartDataUnidad} options={chartOptionsBar} />
      </div>

      {/* Proyectos por Usuario */}
      <div className="chart-section">
        <h3>Proyectos por Usuario</h3>
        <Bar data={chartDataUsuario} options={chartOptionsBar} />
      </div>

      {/* Propuesta Campaña (Sí / No) */}
      <div className="chart-section">
        <h3>Propuesta Campaña (Sí / No)</h3>
        <Pie data={chartDataPropuesta} />
      </div>

      {/* Cual Propuesta */}
      <div className="chart-section">
        <h3>Cual Propuesta</h3>
        <Doughnut data={chartDataCualPropuesta} />
      </div>

      {/* Cobertura del Proyecto */}
      <div className="chart-section">
        <h3>Cobertura del Proyecto</h3>
        <Bar data={chartDataCobertura} options={chartOptionsBar} />
      </div>
    </div>
  );
};

export default DashboardInvestment;
