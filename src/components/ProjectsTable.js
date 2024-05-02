import React from 'react';
import './styles.css';

const imgBasePath = "img/";

const ProjectsTable_circulo_ele = ["ciudadania", "dependecia", "municipio", "organismo"]; // Nombres de los elementos

const ProjectsTable = () => {
    return (
        <section id='projects' className="ProjectsTable-container">

            <div>
                <h2>TABLERO DE <span>PROYECTOS</span></h2>

                <div className="ProjectsTable_eleccion">
                    {ProjectsTable_circulo_ele.map((elemento, index) => (
                        <div key={index} className="ProjectsTable_circulo">
                            <img src={`${imgBasePath}${elemento}.png`} alt={`elemento_${index}`} />
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="content_home">
                <div className="home_img">
                    <img src={`${imgBasePath}homeimg.png`} alt="img_representativa" className="floating-img" />
                </div>
                <div className="home_txt">
                    <img src={`${imgBasePath}hometxt.png`} alt="img_representativa" />
                </div>
            </div> */}
        </section>
    );
}

export default ProjectsTable;
