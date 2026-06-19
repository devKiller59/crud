import axios from 'axios';

const deleteUser = async(id) => {
  const URL = `https://dk59-crud-api.onrender.com/users/${id}/`;
  const req = await axios.delete(URL);
  return req
}

export default deleteUser;