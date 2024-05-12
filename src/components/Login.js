import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Utiliza useNavigate para obtener el objeto de navegación

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Simulación de comprobación de credenciales
        if (username === 'admin' && password === 'hola') {
            // Redirecciona a '/dependencia' después del inicio de sesión
            navigate('/dependencia');
        } else {
            setError('Credenciales inválidas');
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <section id='login' className="container_login">
            <div className="background-login" />
            <div className="login_txt">
                <img src={`${imgBasePath}estrella.png`} alt="img_representativa" />
                <p>Inicia sesión y crea un proyecto</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <img
                            className="input-img"
                            src={showPassword ? `${imgBasePath}password_visible.png` : `${imgBasePath}password.png`}
                            alt="img_representativa"
                            onClick={togglePassword}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit">INGRESAR</button>
                </form>
                <p>¿No tienes una cuenta? <Link to="/" className="link-registrarse">REGÍSTRATE</Link></p>
            </div>
        </section>
    );
}

export default Login;

