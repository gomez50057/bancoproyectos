// import React from 'react';
// import './styles.css'; // Stil-Datei importieren
// const imgBasePath = "img/"; // Basispfad für Bilder

// const Login = () => {

//     return (
//         <section id='login' className="container_login">
//             <div className="background-login" />

//             <div className="login_txt">
//                 <img src={`${imgBasePath}estrella.png`} alt="img_representativa" />
//                 <p>Inicia sesión y crea un proyecto</p>

//                 <div className="input-container">
//                     <input type="text" placeholder="Usuario" />
//                 </div>

//                 <div className="input-container">
//                     <input type="password" placeholder="Contraseña" />
//                     <img className="input-img" src={`${imgBasePath}password.png`} alt="img_representativa" />
//                 </div>

//                 <button>INGRESAR</button>

//                 <p>¿No tienes una cuenta?{" "} <a href="/" className="link-registrarse"> REGÍSTRATE</a>{" "}</p>
//             </div>

//             {/* <div className="login_img">
//                 <img src={`${imgBasePath}loginimg.png`} alt="img_representativa" />
//             </div> */}

//         </section>
//     );
// }

// export default Login;

import React, { useState } from 'react';
import './styles.css';

const imgBasePath = "img/";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
    const [passwordImg, setPasswordImg] = useState(`${imgBasePath}password.png`); // Estado para la imagen de la contraseña

    const togglePassword = () => {
        setShowPassword(!showPassword); // Cambia el estado para mostrar/ocultar la contraseña
        if (showPassword) {
            setPasswordImg(`${imgBasePath}password.png`); // Cambia la imagen a mostrar la contraseña oculta
        } else {
            setPasswordImg(`${imgBasePath}password_visible.png`); // Cambia la imagen a mostrar la contraseña visible
        }
    };

    return (
        <section id='login' className="container_login">
            <div className="background-login" />

            <div className="login_txt">
                <img src={`${imgBasePath}estrella.png`} alt="img_representativa" />
                <p>Inicia sesión y crea un proyecto</p>

                <div className="input-container">
                    <input type="text" placeholder="Usuario" />
                </div>

                <div className="input-container">
                    <input type={showPassword ? "text" : "password"} placeholder="Contraseña" />
                    <img className="input-img" src={passwordImg} alt="img_representativa" onClick={togglePassword} />
                </div>

                <button>INGRESAR</button>

                <p>¿No tienes una cuenta?{" "} <a href="/" className="link-registrarse"> REGÍSTRATE</a>{" "}</p>
            </div>
        </section>
    );
}

export default Login;
