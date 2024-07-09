import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { getCsrfToken } from '../../utils';
// import './Consulta.css';

const Consulta = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/mis-proyectos/');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProject({ ...selectedProject, [name]: value });
  };

  const handleSubmit = async () => {
    const csrfToken = getCsrfToken();
    try {
      await axios.put(`/proyecto/${selectedProject.id}/`, selectedProject, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      alert('Proyecto actualizado exitosamente');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error al actualizar el proyecto');
    }
  };

  return (
    <div className="consulta-container">
      <Typography variant="h4" gutterBottom>Consulta y Actualización de Proyectos</Typography>
      <div className="project-list">
        {projects.map(project => (
          <Button key={project.id} onClick={() => handleSelectProject(project)}>
            {project.project_name}
          </Button>
        ))}
      </div>
      {selectedProject && (
        <div className="project-form">
          <Typography variant="h6" gutterBottom>Actualizar Proyecto</Typography>
          {Object.keys(selectedProject).map(key => (
            key.startsWith('observacion_') && (
              <div key={key} className="dialog-input-container">
                <label className="dialog-label">{key.replace('observacion_', 'Observación para ')}</label>
                <TextField
                  margin="dense"
                  type="text"
                  fullWidth
                  name={key}
                  value={selectedProject[key] || ''}
                  onChange={handleChange}
                  className="truncate-text"
                />
              </div>
            )
          ))}
          <Button onClick={handleSubmit} color="primary">Actualizar Proyecto</Button>
        </div>
      )}
    </div>
  );
};

export default Consulta;
