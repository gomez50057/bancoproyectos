import axios from 'axios';
import Cookies from 'js-cookie';

// Configura Axios para manejar el token CSRF
const csrfToken = Cookies.get('csrftoken');

const instance = axios.create({
  headers: {
    'X-CSRFToken': csrfToken,
    'Content-Type': 'application/json'
  }
});

// Puedes configurar un interceptor para asegurar que el token CSRF siempre se incluya en las solicitudes
instance.interceptors.request.use(config => {
  const token = Cookies.get('csrftoken');
  if (token) {
    config.headers['X-CSRFToken'] = token;
  }
  return config;
});

export default instance;
