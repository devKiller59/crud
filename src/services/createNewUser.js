import axios from 'axios';

const createNewUser = async(data) => {
  const URL = `https://dk59-crud-api.onrender.com/users`;
  const req = await axios.post(URL, data);
  return req
}

export default createNewUser;