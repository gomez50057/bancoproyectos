import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditProject from '../components/EditProject'; // Ajusta la ruta según la ubicación de EditProject

const EditProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(`Fetching project with ID: ${projectId}`);
        const response = await axios.get(`/proyecto/${projectId}/`);
        console.log('Response:', response);

        if (response.status === 200) {
          setProject(response.data);
          console.log('Project data:', response.data);
        } else {
          setError('Error fetching project data');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Error fetching project data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    navigate('/client-projects'); // Ajusta la ruta según tu aplicación
  };

  if (isLoading) {
    console.log('Loading project data...');
    return <div>Cargando...</div>;
  }

  if (error) {
    console.log('Error state:', error);
    return <div>{error}</div>;
  }

  if (!project) {
    console.log('Project is undefined or null');
    return <div>Project data is not available.</div>;
  }

  console.log('Rendering EditProject with project data:', project);

  return (
    <EditProject
      project={project}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isEditMode={true}
    />
  );
};

export default EditProjectPage;
