import React, { useState } from 'react';
import './styles.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
    const [username, setUsername] = useState(''); // Estado para el nombre de usuario
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [error, setError] = useState(null); // Estado para almacenar errores de inicio de sesión

    const togglePassword = () => {
        setShowPassword(!showPassword); // Cambia el estado para mostrar/ocultar la contraseña
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el envío por defecto del formulario

        // Construye el objeto de datos a enviar al servidor
        const formData = {
            username: username,
            password: password
        };

        try {
            // Realiza una solicitud POST al servidor para autenticación
            const response = await fetch('/inicio-sesion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Verifica si la respuesta fue exitosa
            if (response.ok) {
                // Si la respuesta fue exitosa, redirige a la página de inicio
                window.location.href = '/';
            } else {
                // Si la respuesta fue un error, muestra un mensaje de error
                const responseData = await response.json(); // Obtiene el cuerpo de la respuesta como JSON
                setError(responseData.error || 'Credenciales inválidas'); // Establece el error en el mensaje proporcionado por el servidor
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Si hay un error, muestra un mensaje de error
            setError('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
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
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img
                            className="input-img"
                            src={showPassword ? `${imgBasePath}password_visible.png` : `${imgBasePath}password.png`}
                            alt="img_representativa"
                            onClick={togglePassword}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>} {/* Muestra el mensaje de error si hay un error */}

                    <button type="submit">INGRESAR</button>
                </form>

                <p>¿No tienes una cuenta?{" "} <a href="/" className="link-registrarse"> REGÍSTRATE</a>{" "}</p>
            </div>
        </section>
    );
}

export default Login;
