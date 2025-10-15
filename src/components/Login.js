import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import styles from './Login.module.css';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";
const BG_URL = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/backlogin.webp";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const redirectByGroup = useCallback((group) => {
    switch (group) {
      case 'responsable': navigate('/panel-responsable'); break;
      case 'visualizador': navigate('/panel-proyectos'); break;
      case 'cliente': navigate('/panel-usuario'); break;
      case 'proyectos-infraestructura-2025': navigate('/centro-proyectos-infraestructura-2025'); break;
      default: setError('Grupo de usuario desconocido');
    }
  }, [navigate]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setChecking(true);
        setError(null);
        const res = await axios.get('/api/current_user/');
        if (!active) return;
        if (res?.data?.status === 'ok' && res?.data?.group) {
          redirectByGroup(res.data.group);
          return;
        }
      } catch {
        // sin sesión -> mostrar login
      } finally {
        if (active) setChecking(false);
      }
    })();
    return () => { active = false; };
  }, [redirectByGroup]);

  const togglePassword = () => setShowPassword(v => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const response = await axios.post('/inicio-sesion/', { username, password });
      if (response?.data?.status === 'ok') {
        const { group } = response.data;
        group ? redirectByGroup(group) : setError('Grupo de usuario no enviado por el servidor.');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="login" className={styles.container_login}>
      <div
        className={styles.background_login}
        style={{ backgroundImage: `url(${BG_URL})` }}
        aria-hidden="true"
      />
      <div className={styles.login_txt}>
        <img src={`${imgBasePath}estrella.webp`} alt="" className={styles.brand_img} draggable="false" />
        <p className={styles.title}>Inicia sesión</p>

        {checking ? (
          <div className={styles.loading} aria-live="polite">Validando sesión…</div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.input_container}>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.input_container}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.toggle_password}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onClick={togglePassword}
              >
                <img
                  src={showPassword ? `${imgBasePath}password_visible.webp` : `${imgBasePath}password.webp`}
                  alt=""
                  draggable="false"
                />
              </button>
            </div>

            {error && <div className={styles.error_message} role="alert" aria-live="assertive">{error}</div>}

            <button type="submit" className={styles.submit_btn} disabled={submitting}>
              {submitting ? 'Ingresando…' : 'INGRESAR'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Login;
