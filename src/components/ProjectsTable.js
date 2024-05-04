import React, { useState } from 'react';
import './styles.css';

const imgBasePath = "img/";

const projectsInfo = [
    {
        name: "Ciudadanía",
        img: "ciudadania.png",
        info: [
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 3", value: "Valor 3" }
        ]
    },
    {
        name: "Dependencia",
        img: "dependecia.png",
        info: [
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 3", value: "Valor 3" }
        ]
    },
    {
        name: "Municipio",
        img: "municipio.png",
        info: [
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 3", value: "Valor 3" }
        ]
    },
    {
        name: "Organismo",
        img: "organismo.png",
        info: [
            { key: "Información 1", value: "Valor 1" },
            { key: "Información 2", value: "Valor 2" },
            { key: "Información 3", value: "Valor 3" }
        ]
    }
];

const ProjectsTable = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (index) => {
        setSelectedProject(index);
    };

    return (
        <section id='projects' className="ProjectsTable-container">
            <div>
                <h2>TABLERO DE <span>PROYECTOS</span></h2>

                <div className="ProjectsTable_eleccion">
                    {projectsInfo.map((project, index) => (
                        <div key={index} className="ProjectsTable_circulo" onClick={() => handleProjectClick(index)}>
                            <img src={`${imgBasePath}${project.img}`} alt={`elemento_${index}`} />
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject !== null && (
                <div className="ProjectsTable_tabla">
                    <table>
                        <thead>
                            <tr>
                                <th>{projectsInfo[selectedProject].name}</th>
                                <th>Información</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsInfo[selectedProject].info.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.key}</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default ProjectsTable;
