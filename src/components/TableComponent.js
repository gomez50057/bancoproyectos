// import React from 'react';
// import MUIDataTable from "mui-datatables";

// const columns = ["Name", "Company", "City", "State"];

// const TableComponent = () => {
//   const data = [
//     ["Joe James", "Test Corp", "Yonkers", "NY"],
//     ["John Walsh", "Test Corp", "Hartford", "CT"],
//     ["Bob Herm", "Test Corp", "Tampa", "FL"],
//     ["James Houston", "Test Corp", "Dallas", "TX"],
//   ];

//   const options = {
//     selectableRows: false,
//   };

//   return (
//     <div>
//       <MUIDataTable
//         title={"Employee List"}
//         data={data}
//         columns={columns}
//         options={options}
//       />
//     </div>
//   );
// }

// export default TableComponent;




import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';

const TableComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Función para obtener los proyectos desde la API
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/ver-proyectos-tabla');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    // Llamada a la función de obtención de proyectos
    fetchProjects();
  }, []); // Se ejecuta solo una vez al cargar el componente

  const columns = ["Project Name", "Description", "File"];

  const options = {
    selectableRows: false,
  };

  return (
    <div className="table_grid">
      <MUIDataTable
        title={"Project List"}
        data={projects}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default TableComponent;
