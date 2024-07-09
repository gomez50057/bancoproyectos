import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig'; 

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/inicio-sesion/', {
                username: username,
                password: password
            });
            
            if (response.data.status === 'ok') {
                const { group } = response.data; 

                switch (group) {
                    case 'responsable':
                        navigate('/crud');
                        break;
                    case 'visualizador':
                        navigate('/table');
                        break;
                    case 'cliente':
                        navigate('/panel-usuario');
                        break;
                    default:
                        setError('Grupo de usuario desconocido');
                }
            } else {
                setError('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
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
                <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
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
                            src={showPassword ? `${imgBasePath}password_visible.webp` : `${imgBasePath}password.webp`}
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
};

export default Login;
