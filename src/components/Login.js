import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [checking, setChecking] = useState(true); // valida sesión al montar
    const navigate = useNavigate();

    const redirectByGroup = (group) => {
        switch (group) {
            case 'responsable':
                navigate('/panel-responsable');
                break;
            case 'visualizador':
                navigate('/panel-proyectos');
                break;
            case 'cliente':
                navigate('/panel-usuario');
                break;
            case 'proyectos-infraestructura-2025':
                navigate('/centro-proyectos-infraestructura-2025');
                break;
            default:
                setError('Grupo de usuario desconocido');
        }
    };

    // 1) Al montar: intentar acceso por sesión existente
    useEffect(() => {
        let active = true;

        (async () => {
            try {
                setChecking(true);
                setError(null);

                const res = await axios.get('/api/current_user/');

                // Se asume que el backend devuelve { status: 'ok', group: '...' }
                if (!active) return;
                if (res?.data?.status === 'ok' && res?.data?.group) {
                    redirectByGroup(res.data.group);
                    return;
                }

                // Si no trae group o no está ok, se queda en el login
            } catch {
                // No hay sesión o error: continuar mostrando login sin bloquear
            } finally {
                if (active) setChecking(false);
            }
        })();

        return () => { active = false; };
    }, [navigate]);

    const togglePassword = () => setShowPassword(!showPassword);

    // 2) Login manual si no hay sesión existente
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/inicio-sesion/', {
                username,
                password
            });

            if (response?.data?.status === 'ok') {
                const { group } = response.data;
                if (group) {
                    redirectByGroup(group);
                } else {
                    setError('Grupo de usuario no enviado por el servidor.');
                }
            } else {
                setError('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <section id='login' className="container_login">
            <div className="background-login" />
            <div className="login_txt">
                <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
                <p>Inicia sesión</p>

                {/* Mientras valida sesión existente, muestra un loader simple */}
                {checking ? (
                    <div className="loading">Validando sesión…</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <img
                                className="input-img"
                                src={showPassword ? `${imgBasePath}password_visible.webp` : `${imgBasePath}password.webp`}
                                alt="mostrar/ocultar contraseña"
                                onClick={togglePassword}
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit">INGRESAR</button>
                    </form>
                )}

                {/* <p>¿No tienes una cuenta? <Link to="/" className="link-registrarse">REGÍSTRATE</Link></p> */}
            </div>
        </section>
    );
};

export default Login;
