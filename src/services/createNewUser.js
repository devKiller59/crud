import axios from 'axios';

const createNewUser = async (data) => {
  const URL = `${process.env.REACT_APP_API_URL}/api/auth/register/`;

  // Si no viene username en data, lo generamos único usando el correo + un número aleatorio
  const payload = {
    ...data,
    username: data.username || `${data.email.split('@')[0]}_${Math.floor(Math.random() * 1000)}`
  };

  const req = await axios.post(URL, payload);
  return req;
};

export default createNewUser;
