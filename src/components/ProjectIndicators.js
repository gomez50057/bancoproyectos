import React from 'react';
import './styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/indicadores/";


// const projectsInfo = [
//     {
//         name: "Ciudadanía",
//         img: "ciudadania.png",
//         info: [
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 3", value: "Valor 3" }
//         ]
//     },
//     {
//         name: "Dependencia",
//         img: "dependecia.png",
//         info: [
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 3", value: "Valor 3" }
//         ]
//     },
//     {
//         name: "Municipio",
//         img: "municipio.png",
//         info: [
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 3", value: "Valor 3" }
//         ]
//     },
//     {
//         name: "Organismo",
//         img: "organismo.png",
//         info: [
//             { key: "Información 1", value: "Valor 1" },
//             { key: "Información 2", value: "Valor 2" },
//             { key: "Información 3", value: "Valor 3" }
//         ]
//     }
// ];

const ProjectIndicators = () => {


    return (
        <section id='projects' className="ProjectIndicators-container">

            <h2>INDICADORES DE <span>PROYECTOS</span></h2>

            <div className="indicators">
                <div className="indicators_ind">
                    <div className="indicators_cont">
                        <img src={`${imgBasePath}ciudadania.png`} alt="img_representativa" />
                        <p>120</p>
                    </div>
                    <p className="indicators_txt">Dependencia</p>
                </div>

                <div className="indicators_ind">
                    <div className="indicators_cont">
                        <img src={`${imgBasePath}dependencias.png`} alt="img_representativa" />
                        <p>120</p>
                    </div>
                    <p className="indicators_txt">Ciudadanía</p>
                </div>

                <div className="indicators_ind">
                    <div className="indicators_cont">
                        <img src={`${imgBasePath}municipio.png`} alt="img_representativa" />
                        <p>120</p>
                    </div>
                    <p className="indicators_txt">municipio</p>
                </div>

                <div className="indicators_ind">
                    <div className="indicators_cont">
                        <img src={`${imgBasePath}dependencias.png`} alt="img_representativa" />
                        <p>120</p>
                    </div>
                    <p className="indicators_txt">Ciudadanía</p>
                </div>
            </div>
            
        </section>
    );
}

export default ProjectIndicators;
